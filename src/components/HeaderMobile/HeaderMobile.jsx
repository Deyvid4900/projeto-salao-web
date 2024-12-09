import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HeaderMobile.css";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "rsuite";

function HeaderMobile() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  // Efeito para escutar o evento 'beforeinstallprompt'
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Previne o comportamento padrão do navegador
      setDeferredPrompt(event); // Armazena o evento para usá-lo mais tarde
      setIsInstallable(true); // Habilita a exibição do botão de instalação
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Função para lidar com o clique do botão de instalação
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Exibe o prompt de instalação
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou o prompt de instalação");
        } else {
          console.log("Usuário rejeitou o prompt de instalação");
        }
        setDeferredPrompt(null); // Limpa o deferredPrompt após a escolha
        setIsInstallable(false); // Esconde o botão de instalação
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: "Salao/GetSalao",
    });
  }, [dispatch]);

  const { currentSalao } = useSelector((state) => state.salao);
  const { tipo } = JSON.parse(localStorage.getItem("u")) || "Salao";

  const handleLogout = () => {
    const keysToRemove = ["u", "_dSlun"];
    keysToRemove.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`Chave ${key} removida do localStorage.`);
      }
    });
  };

  return (
    <div
      className="bg container-fluid p-3 d-flex justify-content-between align-items-center text-white"
      style={{ zIndex: 50, position: "relative" }}
    >
      <img src="/assets/Group3.png" alt="Logo" className="logo" />

      {/* Mostrar apenas em telas grandes */}
      <div className="d-none d-md-flex flex-row align-items-center gap-4">
        <div className="d-flex flex-column align-items-center">
          <span style={{ fontWeight: 600, fontSize: 25 }}>Deyvid</span>
          <span style={{ fontWeight: 300 }}>Premium</span>
        </div>
        <div
          style={{ width: 60, height: 60, borderRadius: "50%" }}
          className="bg-white"
        ></div>
      </div>

      {/* Botão para abrir o offcanvas */}
      <button
        className="btn no-outline"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title d-flex align-items-center gap-1"
            id="offcanvasRightLabel"
          >
            <Avatar src={currentSalao.capa} circle></Avatar>
            <span>{currentSalao.nome}</span>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled ulServicesMobile">
            <Link to="/AgendamentosMobile">
              <li
                className={
                  location.pathname === "/AgendamentosMobile"
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                Agendamentos
              </li>
            </Link>

            {tipo === "Salao" && (
              <>
                <Link to="/ClientesMobile">
                  <li
                    className={
                      location.pathname === "/ClientesMobile"
                        ? "active dropdown-item"
                        : "dropdown-item"
                    }
                  >
                    <span className="material-symbols-outlined">person</span>
                    Clientes
                  </li>
                </Link>

                <Link to="/ColaboradoresMobile">
                  <li
                    className={
                      location.pathname === "/ColaboradoresMobile"
                        ? "active dropdown-item"
                        : "dropdown-item"
                    }
                  >
                    <span className="material-symbols-outlined">groups</span>
                    Colaboradores
                  </li>
                </Link>

                <Link to="/ServicosMobile">
                  <li
                    className={
                      location.pathname === "/ServicosMobile"
                        ? "active dropdown-item"
                        : "dropdown-item"
                    }
                  >
                    <span className="material-symbols-outlined">
                      design_services
                    </span>
                    Serviços
                  </li>
                </Link>
              </>
            )}

            <Link to="/HorariosMobile">
              <li
                className={
                  location.pathname === "/HorariosMobile"
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                <span className="material-symbols-outlined">schedule</span>
                Horários
              </li>
            </Link>

            <Link to="/AjudaMobile">
              <li className="dropdown-item">
                <span className="material-symbols-outlined">Help</span>
                Ajuda
              </li>
            </Link>

            <Link to={"/DashBoardMobile"}>
              <li className={
                  location.pathname === "/DashBoardMobile"
                    ? "active dropdown-item"
                    : "dropdown-item"
                }>
                <span className="material-symbols-outlined">finance</span>
                DashBoard
              </li>
            </Link>

            <Link to={currentSalao ? `/Salao/${currentSalao.nome}` : "/#"}>
              <li className="dropdown-item">
                <span className="material-symbols-outlined">Arrow_Forward</span>
                Meu Site
              </li>
            </Link>
            <Link to="/settingsMobile">
              <li className={
                  location.pathname === "/settingsMobile"
                    ? "active dropdown-item"
                    : "dropdown-item"
                }>
                <span className="material-symbols-outlined">Settings</span>
                Configurações
              </li>
            </Link>

            <Link to="/" onClick={handleLogout}>
              <li className="dropdown-item">
                <span className="material-symbols-outlined">logout</span>
                Sair
              </li>
            </Link>

            {isInstallable && (
              <Link>
                <li className="dropdown-item">
                  <button
                    className="dropdown-item"
                    onClick={handleInstallClick}
                  >
                    Adicionar à tela inicial
                  </button>
                </li>{" "}
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderMobile;
