import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUser] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username, name, apellido);
      navigate("/api/homedashboard");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Registrarse";

    if (
      email === "" ||
      password === "" ||
      username === "" ||
      name === "" ||
      apellido === ""
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [email, password, username, name, apellido]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUser,
    name,
    setName,
    apellido,
    setApellido,
    showPassword,
    setShowPassword,
    isSubmitDisabled,
    error,
    handleTogglePassword,
    handleSubmit,
  }
};
