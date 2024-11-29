import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HeaderMobile.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function HeaderMobile() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch({
      type: "Salao/GetSalao",
    });
  }, []);
  const { currentSalao } = useSelector((state) => state.salao);

  const { tipo } = JSON.parse(localStorage.getItem("u"));

  function handlelogout() {
    const keysToRemove = ["u", "_dSlun"];

    keysToRemove.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`Chave ${key} removida do localStorage.`);
      } else {
        console.log(`Chave ${key} não encontrada no localStorage.`);
      }
    });
  }

  return (
    <div
      className="bg container-fluid p-3 d-flex justify-content-between align-items-center text-white"
      style={{ zIndex: 50, position: "relative" }}
    >
      <img src="/src/assets/Group3.png" alt="" className="logo" />

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
        <span className="navbar-toggler-icon" />
      </button>

      {/* Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        // style={{backgroundColor:"rgb(47, 50, 67)"}}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            <span>Nome Empresa</span>
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
            <Link to={"/AgendamentosMobile"}>
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
            {/* <Link to={"#"}>
              <li className="disable dropdown-item">
                <span className="material-symbols-outlined">event_available</span>
                Horários disponíveis
              </li>
            </Link> */}

            {tipo == "Salao" ? (
              <Link to={"/ClientesMobile"}>
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
            ) : (
              ""
            )}

            {tipo == "Salao" ? (
              <Link to={"/ColaboradoresMobile"}>
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
            ) : (
              ""
            )}
            {tipo == "Salao" ? (
              <Link to={"/ServicosMobile"}>
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
            ) : (
              ""
            )}
            <Link to={"/HorariosMobile"}>
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
            {}
            <Link to={currentSalao ? `/Salao/${currentSalao.nome}` : "/#"}>
              <li className="dropdown-item">
                <span className="material-symbols-outlined">Arrow_Forward</span>
                Meu Site
              </li>
            </Link>
            {/* <Link to={"#"}>
              <li className="disable dropdown-item " >
                <span className="material-symbols-outlined">bar_chart_4_bars</span>
                DashBoard
              </li>
            </Link> */}

            <Link
              to={"/"}
              onClick={() => {
                handlelogout();
              }}
            >
              <li className="dropdown-item">
                <span className="material-symbols-outlined">logout</span>
                Sair
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderMobile;
