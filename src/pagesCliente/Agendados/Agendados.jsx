import React, { useState, useEffect } from "react";
import { Nav, Panel, FlexboxGrid, Loader, Modal } from "rsuite";
import { Icon } from "@rsuite/icons";
import { Link } from "react-router-dom";
import "./Agendados.css";
import { checkLocalStorageKeysClienteId } from "../../services/util";
import { useDispatch, useSelector } from "react-redux";

const Agendados = () => {
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const { currentClient } = useSelector((state) => state.cliente);

  const { currentSalao } = useSelector((state) => state.salao);
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(checkLocalStorageKeysClienteId());
    if (agendado.length == 0) {
      dispatch({
        type: "agendamento/getAgendamento",
        payload: localStorage.getItem("cl_idtor"),
      });
    }
  }, [dispatch]);

  const { agendado, loadingAgendamento } = useSelector(
    (state) => state.agendamento
  );
  const agendamentosArray = agendado || [];

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
        className="p-2"
        style={{ zIndex: "30", width: "100%" }}
      >
        {currentSalao._id ? (
          <Nav.Item as={Link} to="/AgendamentosMobile" eventKey="app">
            <span className="material-symbols-outlined">arrow_back</span>
          </Nav.Item>
        ) : (
          ""
        )}
        <Nav.Item as={Link} to="/Salao/Deyvid-Barber" eventKey="Home">
          Agendar
        </Nav.Item>
        <Nav.Item as={Link} to="/Agendados" eventKey="Agendados">
          Agendados
        </Nav.Item>
      </Nav>

      <div className="container-fluid px-3">
        <div className="mb-4 mt-5">
          <h4> {currentClient.nome ? "Olá, " + currentClient.nome : "Olá"}</h4>
          <p className="text-muted">Bem-vindo, veja seus horários Agendados</p>
        </div>
        {loadingAgendamento == true ? (
          <div className=" d-flex mt-5 justify-content-center align-items-center">
            <Loader size="lg" />
          </div>
        ) : message !== null ? (
          <FlexboxGrid
            style={{
              overflowX: "auto",
              maxHeight: "75vh",
            }}
            className=""
          >
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
                            setShowModal(true); // Exibe o modal
                            setSelectedAgendamento(agendamento._id); // Armazena o ID do agendamento
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
        <Modal open={showModal} onClose={() => setShowModal(false)} size="xs">
          <Modal.Header>
            <Modal.Title>Confirmar Cancelamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tem certeza de que deseja cancelar este agendamento?</p>
          </Modal.Body>
          <Modal.Footer className=" d-flex justify-content-end gap-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                // Dispatch para cancelar o agendamento
                dispatch({
                  type: "agendamento/deleteAgendamento",
                  payload: selectedAgendamento,
                });
                setShowModal(false); // Fecha o modal
              }}
            >
              Confirmar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Agendados;
