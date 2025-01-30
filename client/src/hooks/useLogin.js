import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [hashed_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const token = await login(email, hashed_password);
      if (token) {
        console.log("Token OK. Bienvenido!")
        localStorage.setItem("token", token);
        navigate("/api/homedashboard");
      } else {
        setErrorMessage("No se recibió un token del servidor");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    document.title = "Iniciar Sesión";
    setIsSubmitDisabled(!email || !hashed_password);
  }, [email, hashed_password]);

  return {
    email,
    setEmail,
    hashed_password,
    setPassword,
    showPassword,
    setShowPassword,
    isSubmitDisabled,
    errorMessage,
    handleTogglePassword,
    handleSubmit,
  }
};
