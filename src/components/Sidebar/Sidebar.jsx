import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "#2F3243",
          width: "250px",
          height: "calc(100vh - 94px)",
          zIndex: 2,
          position: "relative",
          float: "left",
        }}
      >
        <ul
          className="ulServices text-white text-start d-flex flex-column gap-3 mt-5"
          style={{ listStyle: "none", padding: 0 }}
        >
          <Link className="" to={"/Home"}>
            <li className={location.pathname === "/Home" ? "active" : ""}>
              <span className="material-symbols-outlined">calendar_month</span>
              Agendamentos
            </li>
          </Link>
          <Link className="" to={"/Clientes"}>
            <li className={location.pathname === "/Clientes" ? "active" : ""}>
              <span className="material-symbols-outlined">person</span>
              Clientes
            </li>
          </Link>
          <Link className="" to={"/Colaboradores"}>
            <li className={location.pathname === "/Colaboradores" ? "active" : ""}>
              <span className="material-symbols-outlined">groups</span>
              Colaboradores
            </li>
          </Link>
          <Link className="" to={"/Servicos"}>
            <li className={location.pathname === "/Servicos" ? "active" : ""}>
              <span className="material-symbols-outlined">design_services</span>
              Serviços
            </li>
          </Link>
          <Link className="" to={"/Horarios"}>
            <li className={location.pathname === "/Horarios" ? "active" : ""}>
              <span className="material-symbols-outlined">schedule</span>
              Horários
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
