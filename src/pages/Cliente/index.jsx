import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../App";
import BG from "../../components/background/background";
import {
  Table,
  Button,
  Drawer,
  ButtonToolbar,
  Form,
  Input,
  InputGroup,
  InputNumber,
} from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClientesRequest,
  selectedCliente,
} from "../../store/modules/clientes/clientesSlice";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const Cliente = () => {
  const { Column, HeaderCell, Cell } = Table;
  const dispatch = useDispatch();
  const { clientes, cliente } = useSelector((state) => state.cliente);

  const [backdrop, setBackdrop] = useState("static");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchAllClientesRequest());
  }, [dispatch]);

  

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
          <h2 className="pb-4">Clientes</h2>
          <Table
            className="bg-white rounded"
            autoHeight
            data={clientes.clientes}
            onRowClick={(rowData) => {
              dispatch(selectedCliente(rowData));
              setOpen(true);
            }}
          >
            <Column flexGrow={2}>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="nome" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Sexo</HeaderCell>
              <Cell dataKey="sexo" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Data de Nascimento</HeaderCell>
              <Cell dataKey="dataNascimento" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Telefone</HeaderCell>
              <Cell dataKey="telefone" />
            </Column>

            <Column flexGrow={2} align="center" fixed="right">
              <HeaderCell>Ações</HeaderCell>
              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <Button
                    appearance="link"
                    onClick={() => {
                      dispatch(selectedCliente(rowData));
                      setOpen(true);
                    }}
                  >
                    Mais Informações
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
        </div>

        <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
          <Drawer.Header>
            <Drawer.Title>{cliente.nome}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Form fluid>
              <Form.Group controlId="name-1">
                <Form.ControlLabel>Username</Form.ControlLabel>
                <Form.Control disabled name="name" value={cliente.nome} />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
              <Form.Group controlId="Status">
                <Form.ControlLabel>Status</Form.ControlLabel>
                <Form.Control disabled name="status" value={cliente.status} />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
              <Form.Group controlId="Telefone">
                <Form.ControlLabel>Telefone</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="Telefone"
                  value={cliente.telefone}
                />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
              <Form.Group controlId="dataNascimento">
                <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="name"
                  value={cliente.dataNascimento}
                />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
              <Form.Group controlId="Sexo">
                <Form.ControlLabel>Sexo</Form.ControlLabel>
                <Form.Control disabled name="Sexo" value={cliente.sexo} />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
              <Form.Group controlId="dataCadastro">
                <Form.ControlLabel>Data de Cadastro</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="dataCadastro"
                  value={cliente.dataCadastro}
                />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
              <Form.Group controlId="email-1">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  disabled
                  name="email"
                  type="email"
                  value={cliente.email}
                />
                <Form.HelpText></Form.HelpText>
              </Form.Group>
            </Form>
          </Drawer.Body>
        </Drawer>
      </div>
    </>
  );
};

export default Cliente;
