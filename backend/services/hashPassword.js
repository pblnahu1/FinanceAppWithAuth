import bcrypt from "bcryptjs";
import { query } from "../config/db.js";

export const hashPassword = async () => {
  try {
    const users = await query("SELECT id, hashed_password FROM users");
    for (const user of users.rows) {
      if (user.hashed_password.startsWith("$2b$")) {
        // si ya está hasheada, saltar al siguiente usuario
        continue;
      }
      const hashedPassword = await bcrypt.hash(user.hashed_password, 10);
      await query("UPDATE users SET hashed_password = $1 WHERE id = $2", [
        hashedPassword,
        user.id,
      ]);

      console.log(
        `Contraseña para el usuario ${user.id} hasheada correctamente`
      );
    }
  } catch (error) {
    console.error("Aviso de contraseñas: ", error.message);
  }
};
