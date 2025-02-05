const API_URL = "http://localhost:5000/api/auth/login";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Credenciales incorrectas");

    // Guardar token y usuario en localStorage
    localStorage.setItem("usuario", username);
    localStorage.setItem("token", data.token);
    return { success: true, message: `Bienvenid@, ${username}!` };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("usuario");
  localStorage.removeItem("token");
};