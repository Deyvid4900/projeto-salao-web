import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Notification, Message, useToaster } from "rsuite";
import styles from "./styles";
import { checkLocalStorageKeysFromLogin } from "../../services/util";

export const Login = () => {
  const [active, setActive] = useState(false);
  const auth = useAuth();
  const [showError, setShowError] = useState(false);
  const toaster = useToaster();
  const navigate = useNavigate();

  const message = (
    <Notification type="error" header="Erro de autenticação">
      <Message showIcon type="error">
        Email ou senha inválidos.
      </Message>
    </Notification>
  );

  // useEffect(() => {
  //   checkLocalStorageKeysFromLogin();
  // }, []);

  async function onFinish(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    setActive(true); // Mostra o spinner enquanto carrega

    try {
      // Valida se a autenticação foi bem-sucedida
      const isAuthenticated = await auth.authenticate(email, password);

      if (isAuthenticated) {
        // Se autenticado, redireciona com base no tamanho da tela
        if (window.innerWidth < 700) {
          <div
            style={{
              ...styles.spinnerContainer,
              ...styles.spinnerContainerActive,
            }}
          >
            <div
              className="spinner-border"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>;

          navigate("/AgendamentosMobile");

          // Recupera o valor de 'u' do localStorage
          const salaoData = localStorage.getItem("u");

          if (salaoData) {
            const salao = JSON.parse(salaoData);
            localStorage.setItem("_dSlun", salao.id);
            console.log("ID do salão salvo em _dSlun:", salao.id);
          } else {
            console.log("Nenhum dado de salão encontrado no localStorage.");
          }
        } else {
          <div
            style={{
              ...styles.spinnerContainer,
              ...styles.spinnerContainerActive,
            }}
          >
            <div
              className="spinner-border"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>;

          navigate("/Home");
        }
      } else {
        toaster.push(message, { placement: "bottomCenter", duration: 2000 });
        // Mostra alerta se a autenticação falhar
      }
    } catch (error) {
      console.error("Erro no processo de login:", error);
    } finally {
      setActive(false); // Esconde o spinner após a finalização
    }
  }

  return (
    <>
      {showError && message}
      <form onSubmit={onFinish} style={styles.formContainer}>
        <div style={styles.card}>
          <h2 style={styles.title}>Entrar</h2>
          <p style={styles.subtitle}>Por favor coloque seu email e senha</p>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              style={styles.checkbox}
            />
            <label htmlFor="remember" style={styles.checkboxLabel}>
              Lembrar Senha
            </label>
          </div>

          <button type="submit" style={styles.button} disabled={active}>
            Login
          </button>

          <hr style={styles.divider} />
        </div>
      </form>
    </>
  );
};

export default Login;
