import {generateToken} from "../utils/generateToken.js";
import { query } from "../config/db.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  
  try {
    console.log("Iniciando sesion con email:",email)
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("Resultado de la consulta:",result.rows)
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken({id: user.id});
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const registerUser = async (req, res) => {
  const { email, password, username, name, apellido } = req.body;
  console.log('Datos recibidos:',{email, password, username, name, apellido})
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await query("INSERT INTO users (email, password, username, name, apellido) VALUES ($1, $2, $3, $4, $5)", [
      email,
      hashedPassword,
      username,
      name, 
      apellido
    ]);
    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export { loginUser, registerUser };
