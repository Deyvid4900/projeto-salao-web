import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App";
import moment from "moment";
import BG from "../../components/background/background";
import {
  Table,
  Button,
  Drawer,
  ButtonToolbar,
  Form,
  Input,
  Modal,
  Placeholder,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllColaboradoresRequest,
  selectedColaborador,
} from "../../store/modules/colaborador/colaboradorSlice";


const Textarea = React.forwardRef((props, ref: any) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const Colaborador = () => {

  const { Column, HeaderCell, Cell } = Table;
  const dispatch = useDispatch();
  const { colaboradores, colaborador } = useSelector(
    (state: any) => state.colaborador
  );
  
  

  const [overflow, setOverflow] = useState(true);
  const [open, setOpen] = useState(false);
  const [openInformation, setOpenInformation] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    sexo: "",
    dataNascimento: "",
    dataCadastro: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    dispatch(fetchAllColaboradoresRequest());
  }, [dispatch]);

  useEffect(() => {
    if (colaborador) {
      setFormData({
        nome: colaborador.nome || "",
        sexo: colaborador.sexo || "",
        dataNascimento:
          moment(colaborador.dataNascimento).format("YYYY-MM-DD") || "",
        dataCadastro:
          moment(colaborador.dataCadastro).format("YYYY-MM-DD") || "",
        email: colaborador.email || "",
        telefone: colaborador.telefone || "",
      });
    }
  }, [colaborador]);

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRowClick = (rowData) => {
    dispatch(selectedColaborador(rowData));
    setOpenInformation(true);
    

  };
 
  return (
    <>
      <BG />
      <Header />
      <Sidebar />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ maxHeight: "calc(100vh - 95px)", overflowY: "auto" }}
      >
        <div className="mt-5" style={{ width: "95%" }}>
          <h2 className="pb-4">Colaboradores</h2>
          <div className="w-100 m-auto">
            <Table
              className="bg-white rounded"
              autoHeight
              data={colaboradores.colaboradores}
            >
              <Column flexGrow={2}>
                <HeaderCell align="space-between">Nome</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div onClick={() => handleRowClick(rowData)}>
                      {rowData.nome}
                    </div>
                  )}
                </Cell>
              </Column>
              <Column flexGrow={2}>
                <HeaderCell align="space-between">Status</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div onClick={() => handleRowClick(rowData)}>
                      {rowData.status === "A" ? "Ativo" : "Não Ativo"}
                    </div>
                  )}
                </Cell>
              </Column>
              <Column align="center" flexGrow={2}>
                <HeaderCell>Sexo</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div onClick={() => handleRowClick(rowData)}>
                      {rowData.sexo}
                    </div>
                  )}
                </Cell>
              </Column>
              <Column flexGrow={2}>
                <HeaderCell>Data de Nascimento</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div onClick={() => handleRowClick(rowData)}>
                      {rowData.dataNascimento}
                    </div>
                  )}
                </Cell>
              </Column>
              <Column flexGrow={2}>
                <HeaderCell>Email</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div onClick={() => handleRowClick(rowData)}>
                      {rowData.email}
                    </div>
                  )}
                </Cell>
              </Column>
              <Column flexGrow={2}>
                <HeaderCell>Telefone</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div onClick={() => handleRowClick(rowData)}>
                      {rowData.telefone}
                    </div>
                  )}
                </Cell>
              </Column>
              <Column flexGrow={2} align="center" fixed="right">
                <HeaderCell>Ações</HeaderCell>
                <Cell style={{ padding: "5px" }}>
                  {(rowData) => (
                    <Button
                      appearance="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the event from bubbling up
                        dispatch(selectedColaborador(rowData));
                        setOpen(true);
                        setOpenInformation(false);
                      }}
                    >
                      Editar
                    </Button>
                  )}
                </Cell>
              </Column>
            </Table>
          </div>
        </div>

        <Drawer backdrop={"static"} open={open} onClose={() => setOpen(false)}>
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
                <Form.HelpText>Required</Form.HelpText>
              </Form.Group>
              <Form.Group controlId="email-1">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange(value, "email")}
                />
                <Form.HelpText>Required</Form.HelpText>
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
              <Form.Group>
                <ButtonToolbar style={{float:'right'}}>
                  <Button appearance="primary">Salvar</Button>
                  <Button appearance="default" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                </ButtonToolbar>
              </Form.Group>
            </Form>
          </Drawer.Body>
        </Drawer>

        <Modal
          overflow={overflow}
          open={openInformation}
          onClose={() => setOpenInformation(false)}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>Informações do Colaborador</Modal.Title>
            {/* <Modal.CloseButton /> */}
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-4">
              <img
                className="rounded-circle"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                src={colaborador.foto || "default-image-url.jpg"} // Adicione uma URL de imagem padrão
                alt={`${colaborador.nome} Foto`}
              />
              <h4 className="mt-3">{colaborador.nome}</h4>
            </div>

            <Form fluid>
              <Form.Group
                controlId="name-1"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ flex: 2 }}>
                  <Form.ControlLabel>Nome</Form.ControlLabel>
                  <Form.Control
                    name="nome"
                    value={formData.nome}
                    disabled
                    style={{ fontSize: "14pt" }}
                  />
                </div>
                <div style={{ flex: 2 }}>
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    style={{ fontSize: "14pt" }}
                  />
                </div>
              </Form.Group>

              <Form.Group
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ flex: 2 }}>
                  <Form.ControlLabel>Sexo</Form.ControlLabel>
                  <Form.Control
                    name="sexo"
                    value={formData.sexo}
                    disabled
                    style={{ fontSize: "14pt" }}
                  />
                </div>

                <div style={{ flex: 4 }}>
                  <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                  <Form.Control
                    name="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    disabled
                    style={{ fontSize: "14pt" }}
                  />
                </div>
                <div style={{ flex: 4 }}>
                  <Form.ControlLabel>Telefone</Form.ControlLabel>
                  <Form.Control
                    name="telefone"
                    value={formData.telefone}
                    disabled
                    style={{ fontSize: "14pt" }}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Data de Cadastro</Form.ControlLabel>
                <Form.Control
                  name="dataCadastro"
                  type="date"
                  value={formData.dataCadastro}
                  disabled
                  style={{ fontSize: "14pt" }}
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
            <Button
              onClick={() => setOpenInformation(false)}
              appearance="subtle"
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Colaborador;
