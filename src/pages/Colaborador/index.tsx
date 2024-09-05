import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BG from "../../components/background/background";
import CardColaborador from "../../components/colaboradoresCard/colaboradoresCard";

export const Colaborador = () => {
  

  return (
    <div className="colaborador-container">
      <BG />
      <Header />
      <Sidebar />
      <div className="colaborador-content">
        <CardColaborador></CardColaborador>
      </div>
    </div>
  );
};

export default Colaborador;
