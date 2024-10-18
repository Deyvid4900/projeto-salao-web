import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRequest,
  setServico,
  setLoading,
  updateServico,
  updateServicoBehavior,
  deleteServico,
  createServicoRequest,
} from "../../store/modules/servicos/servicosSlice";
import util from "../../services/util";
import RemindIcon from "@rsuite/icons/legacy/Remind";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import "moment/locale/pt-br";
import { Modal, Button, Drawer, Form, Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
import { checkLocalStorageKeys } from "../../services/util";

export const ServicoMobile = () => {
  const dispatch = useDispatch();
  const { servicos, servico, loading, error, behavior } = useSelector(
    (state) => state.servicos
  );
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedServico, setSelectedServico] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false); // Estado para controle do carregamento
  const [foto, setFoto] = useState(null);
  useEffect(() => {
    checkLocalStorageKeys();
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
    if (behavior === "create") {
      // Lógica para criar um novo serviço
      if (!selectedServico.titulo || !selectedServico.preco) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      // Adicione a lógica para salvar um novo serviço
      dispatch({ type: "servicos/createServico", payload: selectedServico }); // Supondo que exista uma ação createServico
    } else {
      // Lógica para atualizar um serviço existente
      if (!selectedServico.titulo || !selectedServico.preco) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      dispatch(updateServico(selectedServico));
    }
    handleCloseDrawer(); // Fecha o Drawer após salvar
  };

  const handleAdd = () => {
    setSelectedServico({
      titulo: "",
      descricao: "",
      preco: "",
      duracao: "",
      arquivos: {},
      foto: foto,
    }); // Inicializa os campos com valores vazios para criação de um novo serviço
    dispatch(updateServicoBehavior("create")); // Define o behavior como create
    handleOpenDrawer(); // Abre o Drawer para adicionar um novo serviço
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
            <div className="p-2" style={{ height: "80vh", overflowY: "auto" }}>
              {servicos.map((servico) => (
                <div
                  key={servico._id}
                  className="col-12 col-md-4 mb-3"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedServico(servico);
                    dispatch(setServico(servico));
                    dispatch(updateServicoBehavior("update")); // Define o behavior como update
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
                <Modal.Title>
                  <h5>{selectedServico.titulo}</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="w-100 p-3" style={{ textAlign: "center" }}>
                  <img
                    style={{ width: "75%", height: "20%" }} // Ajuste de estilo conforme necessário
                    key={selectedServico.arquivos[0]?._id || ""}
                    src={`${util.AWS.bucketURL}/${selectedServico.arquivos[0]?.arquivo}`}
                    alt={selectedServico.titulo}
                  />
                </div>
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
                <Button
                  className="me-2"
                  onClick={() => {
                    setOpenConfirmation(true);
                    handleCloseModal();
                  }}
                  appearance="primary"
                  color="red"
                >
                  <span className="material-symbols-outlined me-1" style={{}}>
                    delete
                  </span>
                  Deletar
                </Button>
                <Button
                  onClick={() => {
                    handleOpenDrawer();
                    dispatch(updateServicoBehavior("update"));
                  }}
                  appearance="primary"
                >
                  <span className="material-symbols-outlined me-1">edit</span>
                  Editar
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
            <Drawer.Title>
              {behavior === "create" ? "Criar Serviço" : "Editar Serviço"}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {selectedServico && (
              <Form fluid onSubmit={handleSaveChanges}>
                <Form.Group>
                  <Form.ControlLabel>Título</Form.ControlLabel>
                  <Form.Control
                    placeholder="Nome do serviço"
                    name="titulo"
                    value={selectedServico.titulo}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({ ...prev, titulo: value }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Descrição</Form.ControlLabel>
                  <Form.Control
                    name="descricao"
                    placeholder="Descrição do serviço"
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
                    type="number"
                    placeholder="Preço do seu serviço"
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
                    type="number"
                    placeholder="Duração do serviço"
                    value={selectedServico.duracao}
                    onChange={(value) =>
                      setSelectedServico((prev) => ({
                        ...prev,
                        duracao: value,
                      }))
                    }
                  />
                </Form.Group>
                <input
                  type="file"
                  onChange={(event) =>
                    setSelectedServico((prev) => ({
                      ...prev,
                      foto: event.target.files[0], // Captura o arquivo selecionado
                    }))
                  }
                  accept="image/*"
                />
              </Form>
            )}
            <Drawer.Actions className="mt-5">
              <Button onClick={handleCloseDrawer} appearance="subtle">
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges} appearance="primary">
                {behavior === "create" ? "Adicionar" : "Salvar"}
              </Button>
            </Drawer.Actions>
          </Drawer.Body>
        </Drawer>
      </div>
      <button
        onClick={handleAdd}
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
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        <span className="material-symbols-outlined text-white">add</span>
      </button>
      <Modal
        backdrop="static"
        role="alertdialog"
        open={openConfirmation}
        onClose={handleCloseModal}
        size="xs"
      >
        <Modal.Body>
          <RemindIcon style={{ color: "#ffb300", fontSize: 24 }} />
          Esse serviço será apagado permanentemente, tem certeza ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              dispatch(deleteServico(servico._id));
              setOpenConfirmation(false);
            }}
            appearance="primary"
          >
            Ok
          </Button>
          <Button
            onClick={() => setOpenConfirmation(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicoMobile;
