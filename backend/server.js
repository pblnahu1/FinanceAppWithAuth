
// import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser"
import cors from "cors"

import { PORT, FRONTEND_URL } from "./config/config.js";
import { query } from "./config/db.js";
import router from "./routes/authRoutes.js";
import {hashPassword} from "./services/hashPassword.js";

const app = express()

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}))

app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.json({
        text: "api works!"
    })
})

app.use('/api', router)


app.get("/conn", async (req, res) => {
    try {
        const result = await query("SELECT NOW()");
        console.log("DB Conectada y Servidor Funcionando: ", result.rows[0]);
        res.json({message: "DB Conectada y Servidor Funcionando"})
    } catch (error) {
        console.error("Database connection error: ", error);
        res.status(500).json({error: "Database connection error"})
    }
});


hashPassword()
    .then(()=>{
        console.log('Todas las contraseñas han sido hasheadas.');
    })
    .catch((error)=>{
        console.error('Aviso de contrseñas: ', error.message);
    })


app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})