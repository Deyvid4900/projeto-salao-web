import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRequest,
  fetchOneRequest,
} from "../../store/modules/colaborador/colaboradorSlice";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import "./styles.css";

export const CardColaborador = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: any) => state.colaborador
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null);

  useEffect(() => {
    ("");
    dispatch(fetchAllRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedColaborador) {
      setShowModal(true);
    }
  }, [selectedColaborador]);

  const colaboradores = data.colaboradores || [];

  const colaborador = data.colaborador || [];

  const handleShowMoreInformation = (id: any) => {
    const colaborador = dispatch(fetchOneRequest(id));
    setSelectedColaborador(colaborador); // Reset selected colaborador to show loading initially
  };

  const handleClose = () => {
    setShowModal(false);
  };

  console.log(colaborador.colaboradores);

  return (
    <>
      <button
        className="btnNovoColaborador btn btn-danger"
        style={{
          float: "right",
          zIndex: 5,
          position: "relative",
          backgroundColor: "#FF5B5B",
        }}
      >
        Novo Colaborador
      </button>
      <div
        className="mt-2"
        style={{
          zIndex: 2,
          position: "relative",
          maxHeight: "75vh",
          backgroundColor: "rgb(255 255 255 / 50%)",
          boxShadow: "6px 6px 12px #d9d9d9,-6px -6px 12px #ffffff",
          // overflowY:'scroll'
        }}
      >
        <div
          className="mt-5"
          style={{ maxHeight: "700px", overflowY: "scroll" }}
        >
          {error && <p>Error: {error}</p>}
          {colaboradores.length > 0 ? (
            <table
              className="table table-hover table-striped table-bordered"
              width={"100%"}
            >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {colaboradores.map((item: any) =>
                  item.status === "A" ? (
                    <tr key={item._id}>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                      <td>{item.telefone}</td>
                      <td
                        style={{ textAlign: "center" }}
                        className="d-flex flex-colunm gap-5 justify-content-center"
                      >
                        <button className="btn btn-primary">Editar</button>
                        <button
                          className=" btnNovoColaborador btn btn-danger"
                          key={item._id}
                          style={{
                            backgroundColor: "#FF5B5B",
                            cursor: "pointer",
                          }}
                        >
                          Excluir
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => handleShowMoreInformation(item._id)}
                        >
                          Mais informações
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {/* Modal for showing colaborador details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Colaborador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading...</p>
          ) : (
            colaborador.colaboradores && (
              <>
                <img
                  src={colaborador.colaboradores[0].foto}
                  alt=""
                  className="container mb-3"
                />
                <p>
                  <strong>Nome:</strong> {colaborador.colaboradores[0].nome}
                </p>
                <p>
                  <strong>Email:</strong> {colaborador.colaboradores[0].email}
                </p>
                <p>
                  <strong>Telefone:</strong>{" "}
                  {colaborador.colaboradores[0].telefone}
                </p>
                <p>
                  <strong>Data de Nascimento:</strong>{" "}
                  {colaborador.colaboradores[0].dataNascimento}
                </p>
                <p>
                  <strong>Sexo:</strong> {colaborador.colaboradores[0].sexo}
                </p>
                <p>
                  <strong>Data de Cadastro:</strong>{" "}
                  {colaborador.colaboradores[0].dataCadastro}
                </p>
                {/* <p><strong>Telefone:</strong> {colaborador.colaboradores[0].servicos}</p> */}
                {/* Add more details as needed */}
              </>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{backgroundColor: "#FF5B5B",}} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardColaborador;
