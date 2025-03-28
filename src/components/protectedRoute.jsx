import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // Ajuste o caminho conforme necessário

const ProtectedRoute = ({ children }) => {
  const user = useContext(AuthContext);

  // Verifique se o usuário está autenticado
  if (!user) {
    return <Navigate to="/" />; // Redireciona para a página de login
  }

  return children; // Retorna os filhos se o usuário estiver autenticado
};

export default ProtectedRoute;
