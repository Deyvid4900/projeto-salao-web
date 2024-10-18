import { Api } from "../../services/api.tsx";
import { IUser } from "./types";

// Função para salvar usuário no localStorage
export function setUserLocalStorage(name: string, user: IUser | any) {
  console.log(user);

  if (name === "id") {
    // Salvar o ID diretamente
    localStorage.setItem(name, user);
  } else {
    // Salvar o objeto inteiro como JSON
    localStorage.setItem(name, JSON.stringify(user));
  }
}

// Função para buscar usuário no localStorage
export function getUserLocalStorage() {
  const json = localStorage.getItem("u");

  if (!json) {
    return null; // Retorna null se não houver dados
  }

  const user = JSON.parse(json);
  console.log(user.id);

  return user; // Retorna o usuário ou null
}

// Função para fazer a requisição de login
export async function logingRequest(email: string, senha: string) {
  try {
    const request = await Api.post("login", { email, senha });
    console.log(request);

    return request.data; // Retorna os dados da requisição
  } catch (error: any) {
    console.error("Erro ao fazer login:", error);
    return {
      error: true,
      message: error.response
        ? error.response.data.message
        : "Erro ao se conectar com o servidor",
    }; // Retorna um objeto com o erro detalhado
  }
}
