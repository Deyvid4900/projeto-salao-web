import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Notification, Message, useToaster } from "rsuite";
import styles from "./styles";
import { checkLocalStorageKeysFromLogin } from "../../services/util";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [active, setActive] = useState(false);
  const auth = useAuth();
  const [showError, setShowError] = useState(false);
  const toaster = useToaster();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const message = (
    <Notification type="error" header="Erro de autenticação">
      <Message showIcon type="error">
        Email ou senha inválidos.
      </Message>
    </Notification>
  );

  useEffect(() => {
    checkLocalStorageKeysFromLogin();
  }, []);

  async function onFinish(event: any) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    setActive(true);

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
            dispatch({
              type: "Salao/GetSalao",
            });
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

          const salaoData = localStorage.getItem("u");

          if (salaoData) {
            const salao = JSON.parse(salaoData);
            localStorage.setItem("_dSlun", salao.id);
            console.log("ID do salão salvo em _dSlun:", salao.id);
            dispatch({
              type: "Salao/GetSalao",
            });
          } else {
            console.log("Nenhum dado de salão encontrado no localStorage.");
          }

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff5b5b 0%, #2f3243 100%)",
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {showError && message}
      <form
        onSubmit={onFinish}
        style={{
          width: "100%",
          minHeight: "70vh",
          maxWidth: "380px",
          padding: "40px",
          borderRadius: "20px",
          background: "#FFF", // --color-studioBody
          textAlign: "center",
        }}
      >
        <div>
          <div className="">
            <Link
              to={"/Salao/"}
              className="btn btnPrimary "
              style={{
                borderRadius: "20px",
                boxShadow: `4px 4px 4px #d9d9d9`,
                color: "#333",
                marginBottom: "20px",
                fontSize: "2.2rem",
                fontWeight: "bold",
              }}
            >
              Agendar
            </Link>
            <div className="d-flex flex-column">
              <hr style={{ borderTop: "1px solid #000;" }} />
              <span>ou</span>
              <hr style={{ borderTop: "1px solid #000;" }} />
            </div>
            <h4
              style={{
                color: "#333",
                marginBottom: "20px",
                fontSize: "1.6rem",
                fontWeight: "bold",
              }}
            >
              Entrar
            </h4>
          </div>
          <p
            style={{
              color: "#666",
              marginBottom: "30px",
              fontSize: "1rem",
            }}
          >
            Por favor coloque seu email e senha
          </p>

          <div
            style={{
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "10px",
                color: "#333",
                fontWeight: "600",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              placeholder="Digite seu email"
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "10px",
                color: "#333",
                fontWeight: "600",
              }}
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              placeholder="Digite sua senha"
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <input
              type="checkbox"
              id="remember"
              name="remember"
              style={{
                marginRight: "10px",
                accentColor: "#ff5b5b", // --color-studioPrimary
              }}
            />
            <label
              htmlFor="remember"
              style={{
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              Lembrar Senha
            </label>
          </div>

          <button
            type="submit"
            disabled={active}
            style={{
              width: "100%",
              padding: "12px",
              boxShadow: `4px 4px 4px #d9d9d9`,
              background: "linear-gradient(135deg, #ff5b5b 50%, #2f3243 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: active ? 0.6 : 1,
            }}
          >
            {active ? "Carregando..." : "Entrar"}
          </button>

          <hr
            style={{
              margin: "30px 0",
              border: "none",
              borderTop: "1px solid #ddd",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
