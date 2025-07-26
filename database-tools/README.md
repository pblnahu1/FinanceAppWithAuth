# Implementando exportación/migración de la Base de Datos Postgres en 

## Ejecución
### Backup completo (SQL + CSV)
`npm run backup`

### Solo backup SQL
`npm run backup:sql`

### Solo backup CSV
`npm run backup:csv`

### Listar backups existentes
`npm run list`

## 🔒 Características de Seguridad

- Variables de entorno: Las credenciales se manejan via .env
- Validación de conexión: Verifica conectividad antes del backup
- Manejo de errores: Captura y reporta errores detalladamente
- Limpieza de datos: Escapa caracteres especiales en CSV
- Timestamps únicos: Evita sobrescribir backups anteriores

## 📊 Opciones de Backup

- SQL completo: Estructura + datos con pg_dump
- CSV por tablas: Ideal para análisis y migraciones parciales
- Backup mixto: Ambos formatos para máxima flexibilidad