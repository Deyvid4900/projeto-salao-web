import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App";
import moment from "moment";
import BG from "../../components/background/background";
import {
  List,
  Button,
  Drawer,
  ButtonToolbar,
  Form,
  Input,
  Modal,
  Notification,
  useToaster,
  FlexboxGrid,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setColaboradores,
  fetchAllColaboradores,
  setColaborador,
  saveColaborador,
  filterColaborador,
  setNotification,
} from "../../store/modules/colaborador/colaboradorSlice";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
import "./ColaboradorMobile.css";
import { fetchAllRequest } from "../../store/modules/servicos/servicosSlice";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const ColaboradoresMobile = () => {
  const { colaboradores, colaborador, components } = useSelector(
    (state) => state.colaborador
  );
  const { servicos } = useSelector((state) => state.servicos);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);
  const toaster = useToaster();
  const [formData, setFormData] = useState({
    _id: undefined,
    nome: "",
    sexo: "",
    dataNascimento: "",
    dataCadastro: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    dispatch(fetchAllColaboradores());
  }, [dispatch]);

  useEffect(() => {
    const { type, description } = components.notification;

    if (type && description) {
      toaster.push(
        <Notification
          type={type}
          header={type === "error" ? "Erro" : "Sucesso"}
          duration={5000}
          closable
        >
          {description}
        </Notification>,
        {
          placement: "bottomEnd",
          duration: 2000,
        }
      );
      const payload = {
        type: "",
        description: "",
      };
      dispatch(setNotification(payload));
    }
  }, [components.notification, toaster]);

  useEffect(() => {
    if (colaborador) {
      setFormData({
        _id: colaborador._id,
        nome: colaborador.nome || "",
        sexo: colaborador.sexo || "",
        dataNascimento: colaborador.dataNascimento || "",
        dataCadastro: colaborador.dataCadastro || "",
        email: colaborador.email || "",
        telefone: colaborador.telefone || "",
      });
    }
  }, [colaborador]);

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRowClick = (rowData) => {
    dispatch(setColaborador(rowData));
    dispatch(fetchAllRequest());
    setOpenInformation(true);


  };

  const handleSubmit = () => {
    const colaboradorData = {
      ...formData,
    };
    dispatch(saveColaborador(colaboradorData));
    setOpen(false);
  };

  return (
    <>
      <HeaderMobile></HeaderMobile>
      <div className="d-flex flex-column justify-content-center align-items-center p-3">
        <h4 className="pb-4">Colaboradores</h4>
        <List bordered hover style={{ width: "100%" }}>
          {colaboradores.map((colaborador) => (
            <List.Item
              key={colaborador._id}
              onClick={() => {
                handleRowClick(colaborador);
              }}
              style={{ cursor: "pointer" }}
            >
              <FlexboxGrid
                className=""
                style={{
                  flexWrap: "nowrap",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FlexboxGrid.Item>
                  <strong>Nome:</strong> {colaborador.nome}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item className="my-2">
                  <strong>Telefone:</strong> {colaborador.telefone}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <strong>Email:</strong> {colaborador.email}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={24} style={{ marginTop: "10px" }}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setColaborador(colaborador)); // Impede a propagação do evento de clique
                      setOpen(true); // Abre o Drawer
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#FF5B5B",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "4px",
                    }} // Ajustes visuais no botão
                    type="button"
                  >
                    Editar
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>

        {/* Drawer for Editing */}
        <Drawer
          placement="bottom"
          size="full"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Drawer.Header>
            <Drawer.Title>Editar Colaborador</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Form fluid>
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control
                  name="nome"
                  value={formData.nome}
                  onChange={(value) => handleInputChange(value, "nome")}
                />
              </Form.Group>
              <Form.Group controlId="email-1">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange(value, "email")}
                />
              </Form.Group>
              <Form.Group controlId="sexo-1">
                <Form.ControlLabel>Sexo</Form.ControlLabel>
                <Form.Control
                  name="sexo"
                  value={formData.sexo}
                  onChange={(value) => handleInputChange(value, "sexo")}
                />
              </Form.Group>
              <Form.Group controlId="dataNascimento-1">
                <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                <Form.Control
                  name="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(value) =>
                    handleInputChange(value, "dataNascimento")
                  }
                />
              </Form.Group>
              <Form.Group controlId="telefone-1">
                <Form.ControlLabel>Telefone</Form.ControlLabel>
                <Form.Control
                  name="telefone"
                  value={formData.telefone}
                  onChange={(value) => handleInputChange(value, "telefone")}
                />
              </Form.Group>
              <ButtonToolbar className="btns">
                <Button appearance="primary" onClick={handleSubmit}>
                  Salvar
                </Button>
                <Button appearance="default" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </ButtonToolbar>
            </Form>
          </Drawer.Body>
        </Drawer>

        {/* Modal for Viewing Information */}
        <Modal
          overflow={true}
          size="full"
          open={openInformation}
          onClose={() => setOpenInformation(false)}
        >
          <Modal.Header>
            <Modal.Title>Informações do Colaborador</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-4">
              <img
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={colaborador.foto || "default-image-url.jpg"}
                alt={`${colaborador.nome} Foto`}
              />
              <h4 className="mt-3">{colaborador.nome || ""}</h4>
            </div>
            <Form fluid>
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="nome" // Certifique-se que o atributo name está presente
                  value={formData.nome}
                  onChange={(value) => handleInputChange(value, "nome")}
                />
              </Form.Group>
              <Form.Group controlId="email-1">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="email" // Certifique-se que o atributo name está presente
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange(value, "email")}
                />
              </Form.Group>
              <Form.Group controlId="sexo-1">
                <Form.ControlLabel>Sexo</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="sexo" // Certifique-se que o atributo name está presente
                  value={formData.sexo}
                  onChange={(value) => handleInputChange(value, "sexo")}
                />
              </Form.Group>
              <Form.Group controlId="dataNascimento-1">
                <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="dataNascimento" // Certifique-se que o atributo name está presente
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(value) =>
                    handleInputChange(value, "dataNascimento")
                  }
                />
              </Form.Group>
              <Form.Group controlId="telefone-1">
                <Form.ControlLabel>Telefone</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="telefone" // Certifique-se que o atributo name está presente
                  value={formData.telefone}
                  onChange={(value) => handleInputChange(value, "telefone")}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setOpenInformation(false)}
              appearance="primary"
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ColaboradoresMobile;
