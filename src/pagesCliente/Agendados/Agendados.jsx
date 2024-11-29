import React, { useState, useEffect } from "react";
import { Message, Nav, Panel, FlexboxGrid } from "rsuite";
import { Icon } from "@rsuite/icons";
import { Link } from "react-router-dom";
import "./Agendados.css";
import { checkLocalStorageKeysClienteId } from "../../services/util";
import { useDispatch, useSelector } from "react-redux";

const Agendados = () => {
  const [message, setMessage] = useState(null);
  const { currentClient } = useSelector((state) => state.cliente);
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

  // Função para formatar data
  const formatarData = (data) => {
    const dataObj = new Date(data);
    return {
      dia: String(dataObj.getUTCDate()).padStart(2, "0"),
      mes: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(dataObj),
      hora: `${String(dataObj.getUTCHours()).padStart(2, "0")}:${String(
        dataObj.getUTCMinutes()
      ).padStart(2, "0")}`,
    };
  };

  return (
    <>
      <Nav
        justified
        appearance="pills"
        defaultActiveKey="Agendados"
        className="p-2 mb-3"
        style={{ zIndex: "30", width: "100%" }}
      >
        <Nav.Item as={Link} to="/Salao/Deyvid-Barber" eventKey="Home">
          Agendar
        </Nav.Item>
        <Nav.Item as={Link} to="/Agendados" eventKey="Agendados">
          Agendados
        </Nav.Item>
      </Nav>

      <div className="container-fluid px-3">
        <div className="mb-4">
          <h4> {currentClient.nome?"Olá, " + currentClient.nome : "Olá"}</h4>
          <p className="text-muted">Bem-vindo, veja seus horários Agendados</p>
        </div>

        {message !== null ? (
          <FlexboxGrid>
            {agendamentosArray.length > 0 ? (
              agendamentosArray.map((agendamento, index) => {
                const { dia, mes, hora } = formatarData(agendamento.data);

                return (
                  <FlexboxGrid.Item key={index} colspan={24} className="mb-3">
                    <Panel
                      bordered
                      className="shadow-sm"
                      header={
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{agendamento.servicoId.titulo}</strong>
                            <div className="text-muted small">
                              Com {agendamento.colaboradorId.nome}
                            </div>
                          </div>
                          <div
                            className="badge bg-primary text-white"
                            style={{ fontSize: "0.9em" }}
                          >
                            {dia} {mes}
                          </div>
                        </div>
                      }
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img
                            src="/assets/whatsapp.png"
                            width={20}
                            alt="WhatsApp"
                            className="me-2"
                          />
                          <span>{agendamento.salaoId.telefone}</span>
                        </div>
                        <div
                        style={{}}
                          className=" btn bg-danger d-flex align-items-center text-white cursor-pointer"
                          onClick={() => {
                            // Lógica de cancelamento
                            console.log("Cancelar agendamento", agendamento.id);
                          }}
                        >
                          <img
                            src="/assets/multiply.png"
                            width={16}
                            alt="Cancelar"
                            className="me-1"
                          />
                          Cancelar
                        </div>
                      </div>
                      <div className="mt-2 text-muted small">
                        Horário: {hora}
                      </div>
                    </Panel>
                  </FlexboxGrid.Item>
                );
              })
            ) : (
              <FlexboxGrid.Item colspan={24}>
                <Panel bordered className="text-center">
                  <div className="mb-3">
                    <Icon icon="calendar" size="4x" className="text-muted" />
                  </div>
                  <p className="text-muted">Nenhum agendamento encontrado.</p>
                </Panel>
              </FlexboxGrid.Item>
            )}
          </FlexboxGrid>
        ) : (
          message
        )}
      </div>
    </>
  );
};

export default Agendados;
