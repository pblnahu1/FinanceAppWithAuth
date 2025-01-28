// sirve para proteger rutas (verificar jwt)

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authenticateToken = (req,res,next) => {
    // obtener el token 
    const token = req.header("Authorization")?.split(" ")[1]; // bearer token
    if(!token){
        return res.status(401).json({message:"Acceso denegado, token no proporcionado"});
    }

    try {
        // verifico el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded; //guardo el usuairo decodificaod en la solicitud
        next(); //continuo la ejecucion de la sig. funcion
    } catch (error) { 
        res.status(401).json({message: "Token no válido o expirado"});
    }
}

export default authenticateToken;