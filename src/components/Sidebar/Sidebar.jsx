import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "#2F3243",
          width: "250px",
          height: "100vh",
          zIndex: 2,
          position: "relative",
          float: "left",
        }}
      >
        <ul
          className=" ulServices  text-white text-start d-flex flex-column gap-5 mt-5"
          style={{ listStyle: "none", padding: 0,textDecoration:"none !important" }}
        >
          <Link className="" to={"/"} rel="stylesheet" href="">
            <li>
              <span class=" material-symbols-outlined">calendar_month</span>
              Agendamentos
            </li>
          </Link>
            <Link className=""  to={"/Clientes"}>
          <li>
              <span class=" material-symbols-outlined">person</span>Clientes
          </li>
            </Link>
            <Link className=""  to={"/Colaboradores"}>
          <li>
              <span class=" material-symbols-outlined">groups</span>Colaboradores
          </li>
            </Link>
            <Link className=""  to={"/Servicos"}>
          <li>
              <span class=" material-symbols-outlined">design_services</span>
              Serviços
          </li>
            </Link>
            <Link className=""  to={"/Horarios"}>
          <li>
              <span class=" material-symbols-outlined">schedule</span>Horários
          </li>
            </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
