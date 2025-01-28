import express from "express"
import { loginUser, registerUser } from "../controllers/authController.js";
import ensureToken from "../middlewares/authMiddleware.js";

const router = express.Router()

// ruta para iniciar sesion
router.post('/login', loginUser)

// ruta protegida
router.get('/homedashboard', ensureToken, (req,res) => {
    res.json({
        message:"Bienvenido a la ruta protegida",
        user: req.user,
    });
});

// ruta para registrarme
router.post('/register', registerUser)

export default router