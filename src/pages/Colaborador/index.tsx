import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BG from "../../components/background/background";
import CardColaborador from "../../components/colaboradoresTable/colaboradoresTable";

export const Colaborador = () => {
  return (
    <>
      <BG />
      <Header />
      <Sidebar />
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{maxHeight:'calc(100vh - 95px)',overflowY:'auto'}}
      >
        <div className="mt-5" style={{ width: "95%" }}>
          <CardColaborador></CardColaborador>
        </div>
      </div>
    </>
  );
};

export default Colaborador;
