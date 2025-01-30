const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
if (!BASE_URL) {
  throw new Error("VITE_BACKEND_URL no está definido en el archivo .env");
}

export const login = async (email, hashed_password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, hashed_password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciales incorrectas"); // devuelve error 401 (la api devuelve estado correcto cuando las credenciales son incorrectas)
      }
      throw new Error("Error en el servidor"); // devuelve error 500
    }

    const data = await response.json();
    return data.token; // solo retorno el token
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};

export const register = async (email, hashed_password, username, first_name, last_name) => {
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, hashed_password, username, first_name, last_name }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Error al registrar usuario");
    }

    return await response.json(); // puedo retornar el usuario creado cuando lo necesite
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};
