import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(!(window.innerWidth > 1300));

  // Atualiza o estado quando a janela é redimensionada
  useEffect(() => {
    function handleResize() {
      setIsExpanded(window.innerWidth > 250);
    }

    window.addEventListener("resize", handleResize);
    
    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "#2F3243",
          width: "12%",
          height: "calc(100vh - 92px)",
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
              {!isExpanded? "Agendamentos":""}
            </li>
          </Link>
          <Link className="" to={"/Clientes"}>
            <li className={location.pathname === "/Clientes" ? "active" : ""}>
              <span className="material-symbols-outlined">person</span>
              {!isExpanded? "Clientes":""}
            </li>
          </Link>
          <Link className="" to={"/Colaboradores"}>
            <li
              className={location.pathname === "/Colaboradores" ? "active" : ""}
            >
              <span className="material-symbols-outlined">groups</span>
              {!isExpanded? "Colaboradores":""}
            </li>
          </Link>
          <Link className="" to={"/Servicos"}>
            <li className={location.pathname === "/Servicos" ? "active" : ""}>
              <span className="material-symbols-outlined">design_services</span>
              {!isExpanded? "Servicos":""}
            </li>
          </Link>
          <Link className="" to={"/Horarios"}>
            <li className={location.pathname === "/Horarios" ? "active" : ""}>
              <span className="material-symbols-outlined">schedule</span>
              {!isExpanded? "Horarios":""}
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
