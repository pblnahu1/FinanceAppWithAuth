import { generateToken } from "../utils/generateToken.js";
import { query } from "../config/db.js";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🟢 Datos recibidos en el login:", { email, password });

    if (!email || !password) {
      console.log("⚠️ Falta email o password en la solicitud");
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("🟡 Resultado de la consulta:", result.rows);

    if (result.rows.length === 0) {
      console.log("❌ Usuario no encontrado");
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    console.log("🔑 Hashed Password en BD:", user.hashed_password);

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    console.log("🔍 ¿Contraseña válida?:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Contraseña incorrecta");
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token y enviar respuesta
    const token = generateToken({ id: user.id });
    console.log("✅ Login exitoso, token generado");

    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, username, first_name, last_name } = req.body;
    
    console.log("🟢 Datos recibidos en el registro:", { email, password, username, first_name, last_name });

    if (!email || !password || !username || !first_name || !last_name) {
      console.log("⚠️ Faltan datos para el registro");
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const userExists = await query("SELECT email FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      console.log("❌ El usuario ya existe:", email);
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Contraseña hasheada correctamente");

    await query(
      "INSERT INTO users (email, hashed_password, username, first_name, last_name) VALUES ($1, $2, $3, $4, $5)", 
      [email, hashedPassword, username, first_name, last_name]
    );

    console.log("✅ Usuario registrado con éxito");

    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export { loginUser, registerUser };
