const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
if (!BASE_URL) {
  throw new Error("VITE_BACKEND_URL no está definido en el archivo .env");
}

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciales incorrectas"); // devuelve error 401 (la api devuelve estado correcto cuando las credenciales son incorrectas)
      }
      throw new Error("Error en el servidor"); // devuelve error 500
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token; // solo retorno el token
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};

export const register = async (email, password, username, name, apellido) => {
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username, name, apellido }),
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

/*export const protectedRequest = async(endpoint, method="GET", body=null) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró un tojen de autenticación. Por favor, inicia sesión");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if(!response.ok){
      if(response.status===401){
        throw new Error("Acceso no autorizado. El token puede estar vencido.");
      }
      throw new Error("Error en la solicitud protegida.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud protegida: ", error.message);
    throw error;
  }
}*/
