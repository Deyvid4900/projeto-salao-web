import React, { useEffect, useState } from "react";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
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
  Loader,
  TagPicker,
  InputPicker,
  Schema,
} from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllColaboradores,
  setColaborador,
  saveColaborador,
  setNotification,
  setBehaviorUpdate,
  setBehaviorCreate,
  addColaborador,
  deleteColaborador,
  resetColaborador,
} from "../../store/modules/colaborador/colaboradorSlice";
import {
  fetchAllRequest,
  setColaboradorId,
} from "../../store/modules/servicos/servicosSlice";
import { checkLocalStorageKeys } from "../../services/util";
import "./ColaboradorMobile.css";

import util from "../../services/util";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const ColaboradoresMobile = () => {
  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    nome: StringType().isRequired("Este campo é obrigatório"),
    email: StringType().isEmail("Digite um email válido"),
    telefone: NumberType()
      .isInteger("Somente números inteiros")
      .isRequired("Este campo é obrigatório"),
  });

  const { colaboradores, colaborador, components, behavior, loading } =
    useSelector((state) => state.colaborador);
  const { servicos, selectedServico } = useSelector((state) => state.servicos);
  const servicosArray = servicos || [];
  const selectedServicoArray = selectedServico || [];
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const toaster = useToaster();
  const [formData, setFormData] = useState({
    _id: undefined,
    nome: "",
    sexo: "",
    dataNascimento: "",
    dataCadastro: "",
    email: "",
    telefone: "",
    servicos: "",
  });

  useEffect(() => {
    checkLocalStorageKeys();
    dispatch(fetchAllColaboradores());
    dispatch({
      type: "servicos/fetchAllServicos",
    });
  }, [dispatch]);

  useEffect(() => {
    const { type, description } = components.notification;
    console.log(description);
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
        foto: null,
      });
    }
  }, [colaborador]);

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRowClick = (rowData) => {
    console.log(rowData);
    dispatch(setColaborador(rowData));
    dispatch(fetchAllRequest());
    setOpenInformation(true);
  };

  const handleSubmit = () => {
    console.log(formData);
    const colaboradorData = {
      ...formData,
    };
    dispatch(saveColaborador(colaboradorData));
    dispatch(fetchAllColaboradores());
    setOpen(false);
  };

  const handleSubmitSalvar = () => {
    console.log(formData);
    const colaboradorData = {
      ...formData,
    };
    dispatch(addColaborador(colaboradorData));
    dispatch(fetchAllColaboradores());
    setOpen(false);
  };

  // Exibe o Loader enquanto os colaboradores estão sendo carregados (quando o array está vazio)
  if (loading) {
    return (
      <>
        <HeaderMobile />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Loader size="lg" content="Carregando colaboradores..." />{" "}
          {/* Loader do rsuite */}
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderMobile />
      <div
        className="d-flex flex-column justify-content-center align-items-center p-3"
        style={{}}
      >
        <h4 className="pb-4">Colaboradores</h4>

        <List
          bordered
          hover
          style={{ width: "100%", height: "80vh", overflowY: "auto" }}
        >
          {colaboradores.map((colaborador) => (
            <List.Item
              key={colaborador._id}
              onClick={() => {
                handleRowClick(colaborador);
                dispatch(setColaboradorId(colaborador._id));
              }}
              style={{ cursor: "pointer" }}
            >
              <FlexboxGrid
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
                  <strong>Email:</strong> {colaborador.email}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <strong>Telefone:</strong> {colaborador.telefone}
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={24} style={{ marginTop: "10px" }}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setBehaviorUpdate()); // Impede a propagação do evento de clique
                      dispatch(setColaborador(colaborador)); // Impede a propagação do evento de clique
                      setOpen(true); // Abre o Drawer
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#2f3243",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "4px",
                    }}
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
            <Drawer.Title>
              {behavior === "update"
                ? "Editar Colaborador"
                : "Adicionar Colaborador"}
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Form fluid model={model} formValue={formData}>
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control
                  name="nome"
                  value={formData.nome}
                  onChange={(value) => handleInputChange(value, "nome")}
                />
              </Form.Group>
              <Form.Group controlId="name-1">
                <div className="col-12 mt-3">
                  <b className="d-block">Serviço</b>
                  <TagPicker
                    data={servicosArray}
                    labelKey="titulo"
                    valueKey="_id"
                    searchable={false}
                    size="lg"
                    placeholder="Selecione o serviço"
                    style={{ width: "100%" }}
                    onChange={(value) => handleInputChange(value, "servicos")}
                  />
                </div>
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
                  accepter={InputPicker}
                  data={[
                    { label: "Masculino", value: "M" },
                    { label: "Feminino", value: "F" },
                  ]}
                  onChange={(value) => handleInputChange(value, "sexo")}
                  style={{ width: "100%" }} // Para garantir que ocupe toda a largura, se necessário
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
                  type="number"
                  name="telefone"
                  value={formData.telefone}
                  onChange={(value) => handleInputChange(value, "telefone")}
                />
              </Form.Group>
              <Form.Group controlId="foto-1">
                <Form.ControlLabel>Foto</Form.ControlLabel>
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files[0]; // Captura o arquivo selecionado
                    handleInputChange(file, "foto");
                  }}
                  accept="image/*"
                />
              </Form.Group>

              <ButtonToolbar className="btns">
                {behavior === "update" ? (
                  <Button appearance="primary" onClick={handleSubmit}>
                    Salvar
                  </Button>
                ) : (
                  <Button appearance="primary" onClick={handleSubmitSalvar}>
                    Adicionar
                  </Button>
                )}

                <Button
                  appearance="default"
                  onClick={() => {
                    setOpen(false);
                    setFormData({
                      _id: undefined,
                      nome: "",
                      sexo: "",
                      dataNascimento: "",
                      dataCadastro: "",
                      email: "",
                      telefone: "",
                      servicos: "",
                    });
                  }}
                >
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
                src={
                  `${util.AWS.bucketURL}/${colaborador.foto}` ||
                  "default-image-url.jpg"
                }
                alt={`${colaborador.nome} Foto`}
              />
              <h4 className="mt-3">{colaborador.nome || ""}</h4>
            </div>
            <Form fluid model={model}>
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="nome"
                  value={formData.nome}
                  onChange={(value) => handleInputChange(value, "nome")}
                />
              </Form.Group>
              <Form.Group controlId="email-1">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange(value, "email")}
                />
              </Form.Group>
              <Form.Group controlId="sexo-1">
                <Form.ControlLabel>Sexo</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="sexo"
                  value={formData.sexo}
                  onChange={(value) => handleInputChange(value, "sexo")}
                />
              </Form.Group>
              <Form.Group controlId="dataNascimento-1">
                <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                <Form.Control
                  disabled
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
                  disabled
                  name="telefone"
                  value={formData.telefone}
                  onChange={(value) => handleInputChange(value, "telefone")}
                  placeholder="(99) 99999-9999" // Placeholder no mesmo formato da máscara
                />
              </Form.Group>
              <Form.Group controlId="servicos">
                <Form.ControlLabel>Serviços</Form.ControlLabel>
                <TagPicker
                  readOnly
                  className="w-100"
                  value={selectedServicoArray.map((servico) => servico._id)} // Array de IDs dos serviços selecionados
                  data={selectedServicoArray} // Array de todos os serviços disponíveis
                  labelKey="titulo" // Propriedade do serviço a ser exibida
                  valueKey="_id" // Propriedade do serviço usada como valor único
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="primary"
              color="red"
              onClick={() => {
                setOpenInformation(false);
                setOpenConfirmation(true);
              }}
            >
              Deletar
            </Button>
            <Button
              onClick={() => setOpenInformation(false)}
              appearance="primary"
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <button
        onClick={() => {
          dispatch(setBehaviorCreate());
          dispatch(resetColaborador());
          setFormData({
            _id: undefined,
            nome: "",
            sexo: "",
            dataNascimento: "",
            dataCadastro: "",
            email: "",
            telefone: "",
            servicos: "",
          });
          setOpen(true);
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

      <Modal
        backdrop="static"
        role="alertdialog"
        open={openConfirmation}
        onClose={handleClose}
        size="xs"
      >
        <Modal.Body>
          <RemindIcon style={{ color: "#ffb300", fontSize: 24 }} />
          Esse colaborador será apagado permanentemente, tem certeza ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              dispatch(deleteColaborador(colaborador));
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

export default ColaboradoresMobile;
