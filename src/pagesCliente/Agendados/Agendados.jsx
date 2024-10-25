import React, { useState, useEffect } from "react";
import { Message, Nav } from "rsuite";
import { Link } from "react-router-dom";
import "./Agendados.css";
import { checkLocalStorageKeysClienteId } from "../../services/util";
import { useDispatch, useSelector } from "react-redux";

const Agendados = () => {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(checkLocalStorageKeysClienteId());
    dispatch({
      type: "agendamento/getAgendamento",
      payload: localStorage.getItem("cl_idtor"),
    });
  }, [dispatch]);

  const { agendado } = useSelector((state) => state.agendamento);
  const agendamentosArray = agendado.agendamentos || [];

  return (
    <>
      <Nav
        justified
        appearance="pills"
        defaultActiveKey="Agendados"
        className="p-2 gap-2"
        style={{ zIndex: "30", width: "100%" }}
      >
        <Nav.Item as={Link} to="/Salao/Deyvid-Barber" eventKey="Home">
          Agendar
        </Nav.Item>
        <Nav.Item as={Link} to="/Agendados" eventKey="Agendados">
          Agendados
        </Nav.Item>
      </Nav>
      <div className="p-3">
        <h4>Oi, Fulano</h4>
        <p>Bem-vindo, veja seus horários Agendados</p>
        <h5 className="mt-3">Horário(s) Agendado(s)</h5>
      </div>

      {message !== null ? (
        agendamentosArray.length > 0 ? (
          agendamentosArray.map((agendamento, index) => (
            <div
              key={index}
              className="w-100 p-2 mb-2"
              style={{ backgroundColor: "#f2f2f5" }}
            >
              <div
                className="d-flex"
                style={{ height: 150, backgroundColor: "#f2f2f5" }}
              >
                <div
                  className="p-1 w-75 h-100 d-flex align-items-center justify-content-end"
                  style={{ textAlign: "end" }}
                >
                  <ul>
                    <li>
                      <b>Especialista</b>: {agendamento.colaboradorId.nome}{" "}
                      <br /> <b>Serviço</b>: {agendamento.servicoId.titulo}{" "}
                      <br /><b>No dia:</b> {new Date(agendamento.data).getUTCDate()} às {String(new Date(agendamento.data).getUTCHours()).padStart(2, '0')}:{String(new Date(agendamento.data).getUTCMinutes()).padStart(2, '0')}
                    </li>
                  </ul>
                </div>
                <div className="w-25 h-100" style={{ backgroundColor: "" }}></div>
              </div>
              <hr style={{ margin: "5px 0" }} />
              <div className="mt-1 d-flex justify-content-evenly">
                <div className="d-flex align-items-center gap-1">
                  <img
                    src="../../assets/whatsapp.png"
                    width={16}
                    alt="Número da barbearia"
                  />
                  {agendamento.salaoId.telefone}
                </div>
                <div className="d-flex align-items-center gap-1">
                  <img src="../../assets/multiply.png" alt="Botão cancelar" />
                  Cancelar
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-100 p-2" style={{ backgroundColor: "#f2f2f5" }}>
            <p>Nenhum agendamento encontrado.</p>
          </div>
        )
      ) : (
        message
      )}
    </>
  );
};

export default Agendados;
