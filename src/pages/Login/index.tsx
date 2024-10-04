import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import styles from "./styles";

export const Login = () => {
  const [active, setActive] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();


  async function onFinish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setActive(true); // Mostra o spinner enquanto carrega

    try {
      await auth.authenticate(email, password);
      if (window.innerWidth < 700) {
        navigate("/AgendamentosMobile"); // Redirecionar para outra rota
        localStorage.setItem("_dSlun", "66e0507b48555f3e9898edfb");
      }
      else{
        navigate("/Home");
        localStorage.setItem("_dSlun", "66e0507b48555f3e9898edfb");
      }
    } catch (error) {
      alert("Email ou senha inválidos");
    } finally {
      setActive(false); // Esconde o spinner após a finalização
    }
  }

  return (
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

      {active && (
        <div style={{ ...styles.spinnerContainer, ...styles.spinnerContainerActive }}>
          <div
            className="spinner-border"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default Login;
