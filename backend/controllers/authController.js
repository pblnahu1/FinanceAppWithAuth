import {generateToken} from "../utils/generateToken.js";
import { query } from "../config/db.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  const { email, hashed_password } = req.body;
  
  
  try {
    console.log("Iniciando sesion con email:",email)
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("Resultado de la consulta:",result.rows)
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(hashed_password, user.hashed_password);
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
  const { email, hashed_password, username, first_name, last_name } = req.body;
  console.log('Datos recibidos:',{email, hashed_password, username, first_name, last_name})
  try {
    const hashedPassword = await bcrypt.hash(hashed_password, 10);
    await query("INSERT INTO users (email, hashed_password, username, first_name, last_name) VALUES ($1, $2, $3, $4, $5)", [
      email,
      hashedPassword,
      username,
      first_name, 
      last_name
    ]);
    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export { loginUser, registerUser };
