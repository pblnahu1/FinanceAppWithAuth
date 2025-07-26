import {Client} from "pg";
import fs from "fs/promises";
import path from "path";
import {exec} from "child_process";
import {promisify} from "util";

const execAsync = promisify(exec);

class PostgresBackupManager {
  constructor(config) {
    this.config = {
      // Configuración de la base de datos
      host: config.host || 'localhost',
      port: config.port || 5444,
      database: config.database,
      username: config.username,
      password: config.password,
      
      // Configuración de Docker
      containerName: config.containerName,
      
      // Configuración de backup
      backupDir: config.backupDir || './backups',
      timestamp: new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    };
  }

  // Método para crear directorio de backups
  async ensureBackupDirectory() {
    try {
      await fs.access(this.config.backupDir);
    } catch {
      await fs.mkdir(this.config.backupDir, { recursive: true });
      console.log(`📁 Directorio de backup creado: ${this.config.backupDir}`);
    }
  }

  // Validar conexión a la base de datos
  async validateConnection() {
    const client = new Client({
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      user: this.config.username,
      password: this.config.password,
    });

    try {
      await client.connect();
      const result = await client.query('SELECT version()');
      console.log('✅ Conexión exitosa a PostgreSQL');
      console.log(`📊 Versión: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
      await client.end();
      return true;
    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
      return false;
    }
  }

  // Exportar estructura completa de la BD (SQL)
  async exportToSQL() {
    await this.ensureBackupDirectory();
    
    const filename = `${this.config.database}_backup_${this.config.timestamp}.sql`;
    const filepath = path.join(this.config.backupDir, filename);
    
    try {
      console.log('🔄 Iniciando backup SQL completo...');
      
      // Comando pg_dump a través de Docker
      const dockerCommand = `docker exec ${this.config.containerName} pg_dump -U ${this.config.username} -d ${this.config.database} --verbose --clean --no-owner --no-privileges`;
      
      console.log('📤 Ejecutando pg_dump...');
      const { stdout, stderr } = await execAsync(dockerCommand);
      
      if (stderr && !stderr.includes('NOTICE')) {
        console.warn('⚠️ Advertencias durante el backup:', stderr);
      }
      
      // Guardar el backup
      await fs.writeFile(filepath, stdout, 'utf8');
      
      console.log('✅ Backup SQL completado exitosamente');
      console.log(`📁 Archivo guardado: ${filepath}`);
      console.log(`📊 Tamaño: ${(await fs.stat(filepath)).size} bytes`);
      
      return filepath;
    } catch (error) {
      console.error('❌ Error durante el backup SQL:', error.message);
      throw error;
    }
  }

  // Exportar tablas individuales a CSV
  async exportToCSV(tables = null) {
    await this.ensureBackupDirectory();
    
    const client = new Client({
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      user: this.config.username,
      password: this.config.password,
    });

    try {
      await client.connect();
      console.log('🔄 Iniciando exportación a CSV...');
      
      // Obtener lista de tablas si no se especifica
      if (!tables) {
        const tablesQuery = `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `;
        const result = await client.query(tablesQuery);
        tables = result.rows.map(row => row.table_name);
      }
      
      console.log(`📋 Exportando ${tables.length} tablas:`, tables.join(', '));
      
      const exportedFiles = [];
      
      for (const table of tables) {
        try {
          console.log(`📤 Exportando tabla: ${table}`);
          
          // Obtener datos de la tabla
          const query = `SELECT * FROM ${table}`;
          const result = await client.query(query);
          
          if (result.rows.length === 0) {
            console.log(`⚠️ Tabla ${table} está vacía`);
            continue;
          }
          
          // Crear CSV
          const filename = `${table}_${this.config.timestamp}.csv`;
          const filepath = path.join(this.config.backupDir, filename);
          
          // Headers
          const headers = result.fields.map(field => field.name);
          let csvContent = headers.join(',') + '\n';
          
          // Datos
          for (const row of result.rows) {
            const values = headers.map(header => {
              const value = row[header];
              if (value === null) return '';
              if (typeof value === 'string') {
                // Escapar comillas y envolver en comillas si contiene comas o saltos de línea
                const escaped = value.replace(/"/g, '""');
                return escaped.includes(',') || escaped.includes('\n') || escaped.includes('\r') 
                  ? `"${escaped}"` : escaped;
              }
              return value.toString();
            });
            csvContent += values.join(',') + '\n';
          }
          
          await fs.writeFile(filepath, csvContent, 'utf8');
          exportedFiles.push(filepath);
          
          console.log(`✅ ${table}: ${result.rows.length} registros exportados`);
          
        } catch (error) {
          console.error(`❌ Error exportando tabla ${table}:`, error.message);
        }
      }
      
      await client.end();
      
      console.log('✅ Exportación CSV completada');
      console.log(`📁 Archivos creados: ${exportedFiles.length}`);
      
      return exportedFiles;
      
    } catch (error) {
      console.error('❌ Error durante exportación CSV:', error.message);
      await client.end();
      throw error;
    }
  }

  // Crear backup completo (SQL + CSV)
  async createFullBackup(includeTables = null) {
    console.log('🚀 Iniciando backup completo...');
    
    const isConnected = await this.validateConnection();
    if (!isConnected) {
      throw new Error('No se pudo conectar a la base de datos');
    }
    
    const results = {
      sqlBackup: null,
      csvBackups: [],
      timestamp: this.config.timestamp
    };
    
    try {
      // Backup SQL completo
      results.sqlBackup = await this.exportToSQL();
      
      // Backup CSV por tablas
      results.csvBackups = await this.exportToCSV(includeTables);
      
      // Crear archivo de resumen
      const summaryPath = path.join(this.config.backupDir, `backup_summary_${this.config.timestamp}.json`);
      await fs.writeFile(summaryPath, JSON.stringify(results, null, 2));
      
      console.log('🎉 Backup completo finalizado exitosamente');
      console.log(`📄 Resumen guardado en: ${summaryPath}`);
      
      return results;
      
    } catch (error) {
      console.error('💥 Error durante el backup completo:', error.message);
      throw error;
    }
  }

  // Listar backups existentes
  async listBackups() {
    try {
      const files = await fs.readdir(this.config.backupDir);
      const backups = files.filter(file => 
        file.includes(this.config.database) && 
        (file.endsWith('.sql') || file.endsWith('.json'))
      );
      
      console.log('📚 Backups disponibles:');
      for (const backup of backups) {
        const filepath = path.join(this.config.backupDir, backup);
        const stats = await fs.stat(filepath);
        console.log(`  📄 ${backup} (${stats.size} bytes, ${stats.mtime.toLocaleString()})`);
      }
      
      return backups;
    } catch (error) {
      console.error('❌ Error listando backups:', error.message);
      return [];
    }
  }
}

// Función principal de uso
async function main() {
  // Configuración - PERSONALIZA ESTOS VALORES
  const config = {
    host: 'localhost',           // Host donde está accesible la BD
    port: 5444,                  // Puerto de PostgreSQL
    database: 'db_fluxshop',   // Nombre de tu base de datos
    username: 'postgres',        // Usuario de PostgreSQL
    password: 'pblnahupassword',     // Contraseña (mejor usar variables de entorno)
    containerName: 'postgresfluxshop', // Nombre del contenedor Docker
    backupDir: './backups'       // Directorio donde guardar los backups
  };

  // Crear instancia del manager
  const backupManager = new PostgresBackupManager(config);

  try {
    console.log('🔧 Iniciando proceso de backup...');
    
    // Opción 1: Backup completo (SQL + CSV)
    await backupManager.createFullBackup();
    
    // Opción 2: Solo backup SQL
    // await backupManager.exportToSQL();
    
    // Opción 3: Solo CSV de tablas específicas
    // await backupManager.exportToCSV(['usuarios', 'productos', 'pedidos']);
    
    // Listar backups existentes
    await backupManager.listBackups();
    
  } catch (error) {
    console.error('💥 Error en el proceso:', error.message);
    process.exit(1);
  }
}

// Manejo de variables de entorno para mayor seguridad
function getConfigFromEnv() {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5444,
    database: process.env.DB_NAME || 'db_fluxshop',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'pblnahupassword',
    containerName: process.env.DOCKER_CONTAINER || 'postgresfluxshop',
    backupDir: process.env.BACKUP_DIR || './backups'
  };
}

// Exportar para uso como módulo
export { PostgresBackupManager, getConfigFromEnv };

// Ejecutar si es llamado directamente
if (true) {
  main().catch(console.error);
}