import React, { useState, useEffect } from "react";
import Mensaje from "./mensaje";
import { loginUser, logoutUser } from "../services/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Obtener el usuario guardado al cargar el componente
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsername(usuarioGuardado);
    }
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Función de login
  const handleLogin = async () => {
    try {
      const result = await loginUser(username, password);
      setMensaje(result.message);
      
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("usuario", username);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setMensaje("Error al iniciar sesión, por favor verifica tus credenciales");
    }
  };

  // Función de logout
  const handleLogout = () => {
    logoutUser();
    setUsername("");
    setIsAuthenticated(false);
    setMensaje("Sesión cerrada");
  };

  return (
    <div className="container mt-5">
      <h2>Inicio de Sesión</h2>
      <div className="form-group">
        <label>Usuario:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Contraseña:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {!isAuthenticated ? (
        <button className="btn btn-primary mt-2" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      ) : (
        <button className="btn btn-danger mt-2" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      )}
      {mensaje && <Mensaje mensaje={mensaje} />}
    </div>
  );
};

export default Login;



