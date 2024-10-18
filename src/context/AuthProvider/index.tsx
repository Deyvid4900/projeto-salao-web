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
    console.log(user);
    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    try {
      // Faz a requisição de login e espera pela resposta
      const response = await logingRequest(email, password);

      // Cria o payload com o token, email e id retornados
      const payload = {
        token: response.token,
        email: response.email,
        id: response.id,
      };

      // Obtém o usuário atual salvo localmente

      // Define o ID do usuário atual
      setUser(payload.id);

      // Armazena o payload no localStorage com a chave "u"
      setUserLocalStorage("u", payload);

      // Verifica se aux existe e armazena o id antigo, caso exista
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      // Tratar erro de autenticação aqui, como mostrar uma mensagem ao usuário
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
