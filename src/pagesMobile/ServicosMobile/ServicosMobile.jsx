import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRequest,
  setServico,
  setLoading,
  updateServico,
} from "../../store/modules/servicos/servicosSlice";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import "moment/locale/pt-br";
import { Modal, Button, Drawer, Form, Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

export const ServicoMobile = () => {
  const dispatch = useDispatch();
  const { servicos, loading, error } = useSelector((state) => state.servicos);

  const [selectedServico, setSelectedServico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false); // Estado para controle do carregamento

  useEffect(() => {
    dispatch({
      type: "servicos/fetchAllServicos",
    });
  }, [dispatch]);

  const formatDate = (dateString) => {
    return moment(dateString).format("D [de] MMMM [de] YYYY [às] HH:mm:ss");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedServico(null); // Limpa a seleção ao fechar
  };

  const handleOpenDrawer = () => {
    setShowModal(false);
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setSelectedServico(null); // Limpa a seleção ao fechar
  };

  const handleSaveChanges = () => {
    dispatch(updateServico(selectedServico));
    dispatch(setLoading(false))
    dispatch({
      type: "servicos/fetchAllServicos",
    });
    handleCloseDrawer(); // Fecha o drawer após salvar
  };

  return (
    <>
      <HeaderMobile />
      <div className="container mt-4">
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <Loader size="lg" content="Carregando serviços..." />
          </div>
        )}
        {error && <div className="alert alert-danger">Error: {error}</div>}
        {!loading && !error && (
          <div>
            <h4 className="mb-4 text-center">Serviços</h4>
            <div className="row">
              {servicos.map((servico) => (
                <div
                  key={servico._id}
                  className="col-12 col-md-4 mb-3"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedServico(servico);
                    dispatch(setServico(servico));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{servico.titulo}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal do RSuite */}
        <Modal open={showModal} onClose={handleCloseModal}>
          {selectedServico && (
            <>
              <Modal.Header>
                <Modal.Title>{selectedServico.titulo}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <strong>Recorrência:</strong> {selectedServico.recorrencia}
                </p>
                <p>
                  <strong>Status:</strong> {selectedServico.status}
                </p>
                <p>
                  <strong>Descrição:</strong> {selectedServico.descricao}
                </p>
                <p>
                  <strong>Preço:</strong> {selectedServico.preco}
                </p>
                <p>
                  <strong>Data do Cadastro:</strong>{" "}
                  {formatDate(selectedServico.dataCadastro)}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleOpenDrawer} appearance="primary">
                  Editar
                </Button>
                <Button onClick={handleCloseModal} appearance="subtle">
                  Fechar
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>

        {/* Drawer do RSuite para Edição */}
        <Drawer
          open={showDrawer}
          onClose={handleCloseDrawer}
          placement="right"
          style={{ width: "100vw" }}
        >
          <Drawer.Header>
            <Drawer.Title>Editar Serviço</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {selectedServico && (
              <Form fluid>
                <Form.Group>
                  <Form.ControlLabel>Título</Form.ControlLabel>
                  <Form.Control
                    name="titulo"
                    value={selectedServico.titulo}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({ ...prev, titulo: value }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Recorrência</Form.ControlLabel>
                  <Form.Control
                    name="recorrencia"
                    value={selectedServico.recorrencia}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({
                        ...prev,
                        recorrencia: value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Status</Form.ControlLabel>
                  <Form.Control
                    name="status"
                    value={selectedServico.status}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({ ...prev, status: value }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Descrição</Form.ControlLabel>
                  <Form.Control
                    name="descricao"
                    value={selectedServico.descricao}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({
                        ...prev,
                        descricao: value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Preço</Form.ControlLabel>
                  <Form.Control
                    name="preco"
                    value={selectedServico.preco}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({ ...prev, preco: value }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Duração</Form.ControlLabel>
                  <Form.Control
                    name="duracao"
                    value={selectedServico.duracao}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({
                        ...prev,
                        duracao: value,
                      }))
                    }
                  />
                </Form.Group>
              </Form>
            )}
            <Drawer.Actions className="mt-5">
              <Button
                onClick={handleSaveChanges}
                appearance="primary"
              >
                Salvar
              </Button>
              <Button onClick={handleCloseDrawer} appearance="subtle">
                Cancelar
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </Drawer>
      </div>
      <button
        onClick={() => {
          dispatch(resetHorario());
          setComponents("drawer", true);
          dispatch(
            updateHorario({
              behavior: "create",
            })
          );
        }}
        className="d-flex align-items-center justify-content-center"
        style={{
          bottom: 50,
          right: 30,
          position: "absolute",
          zIndex: "20",
          borderRadius: "50%",
          width: 70,
          height: 70,
          backgroundColor: "rgb(255, 91, 91)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Sombra adicionada
        }}
      >
        <span className="material-symbols-outlined text-white">add</span>
      </button>
    </>
  );
};

export default ServicoMobile;
