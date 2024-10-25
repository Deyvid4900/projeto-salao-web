import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import {
  getUserLocalStorage,
  logingRequest,
  setUserLocalStorage,
} from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();
    // console.log(user);
    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email, password) {
  try {
    const response = await logingRequest(email, password);

    if (response.error) {
      return false; // Retorna false se houve erro
    }

    const payload = {
      token: response.token,
      email: response.email,
      id: response.id,
    };

    setUser(payload.id);
    setUserLocalStorage("u", payload);

    const aux = localStorage.getItem("aux");
    if (aux) {
      const auxData = JSON.parse(aux);
      console.log("ID antigo armazenado:", auxData.oldId);
    }

    return true; // Retorna true se a autenticação foi bem-sucedida
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return false; // Retorna false em caso de exceção
  }
}

  

  function logout() {
    setUser(null);
    setUserLocalStorage("u", null);
    setUserLocalStorage("_dSlun", null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
