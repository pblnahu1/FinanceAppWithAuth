import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [hashed_password, setPassword] = useState("");
  const [username, setUser] = useState("");
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
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
      await register(email, hashed_password, username, first_name, last_name);
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
      hashed_password === "" ||
      username === "" ||
      first_name === "" ||
      last_name === ""
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [email, hashed_password, username, first_name, last_name]);

  return {
    email,
    setEmail,
    hashed_password,
    setPassword,
    username,
    setUser,
    first_name,
    setName,
    last_name,
    setLastName,
    showPassword,
    setShowPassword,
    isSubmitDisabled,
    error,
    handleTogglePassword,
    handleSubmit,
  }
};
