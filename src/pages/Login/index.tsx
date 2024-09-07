import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import styles from "./styles";

export const Login = () => {
  const [active, setActive] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function onFinish(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    setActive(true); // Show spinner

    try {
      await auth.authenticate(email, password);
      navigate("/Home");
      localStorage.setItem("_dSlun", '66d1fc606938c910b08d0b20');
    } catch (error) {
      alert("Email ou senha inválidos");
    } finally {
      setActive(false); // Hide spinner
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

        <button
          type="button"
          style={{ ...styles.socialButton, ...styles.googleButton }}
        >
          <span style={styles.icon}>G</span> Entrar com o Google
        </button>

        <button
          type="button"
          style={{ ...styles.socialButton, ...styles.facebookButton }}
        >
          <span style={styles.icon}>f</span> Entrar com o Facebook
        </button>
      </div>

      <div style={active ? { ...styles.spinnerContainer, ...styles.spinnerContainerActive } : styles.spinnerContainer}>
        <div
          className="spinner-border"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </form>
  );
};

export default Login;
