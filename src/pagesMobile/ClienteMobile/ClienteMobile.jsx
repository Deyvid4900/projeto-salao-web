import React, { useEffect, useState } from "react";
import BG from "../../components/background/background";
import { Table, Button, Drawer, Form, Input, Loader } from "rsuite"; // Adiciona Loader
import "rsuite/dist/rsuite-no-reset.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClientesRequest,
  selectedCliente,
} from "../../store/modules/clientes/clientesSlice";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const ClienteMobile = () => {
  const { Column, HeaderCell, Cell } = Table;
  const dispatch = useDispatch();

  const [backdrop, setBackdrop] = useState("static");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllClientesRequest());
  }, [dispatch]);

  const { clientes, cliente, loading } = useSelector((state) => state.cliente); // Adiciona o loading do estado

  if (loading) {
    return (
      <>
        <HeaderMobile />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
        >
        <Loader size="lg" content="Carregando clientes..." /> {/* Loader do rsuite */}
      </div>
        </>
    );
  }

  return (
    <>
      <HeaderMobile />

      <div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            maxHeight: "calc(100vh - 95px)",
            overflowY: "auto",
            padding: "0 10px", // Reduzir padding em telas menores
          }}
        >
          <div className="mt-3" style={{ width: "100%" }}>
            <h4
              className="pb-4 "
              style={{ position: "relative", zIndex: 10, textAlign: "center" }}
            >
              Clientes
            </h4>

            {/* Aumentar a responsividade do Table em telas menores */}
            <Table
              className="bg-white rounded"
              autoHeight
              data={clientes.clientes}
              onRowClick={(rowData) => {
                dispatch(selectedCliente(rowData));
                setOpen(true);
              }}
              // Tornar o scroll horizontal mais acessível em telas menores
              style={{
                fontSize: "0.9rem", // Tamanho menor para caber melhor em mobile
                overflowX: "auto",
              }}
            >
              <Column fixed>
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="nome" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>

              {/* Colunas extras visíveis somente em telas maiores */}
              <Column flexGrow={1} className="d-md-table-cell">
                <HeaderCell>Telefone</HeaderCell>
                <Cell dataKey="telefone" />
              </Column>

              <Column flexGrow={1} align="center" fixed="right">
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
                      <span className="material-symbols-outlined">info</span>
                    </Button>
                  )}
                </Cell>
              </Column>
            </Table>
          </div>

          {/* Drawer adaptado para mobile */}
          <Drawer
            backdrop={backdrop}
            open={open}
            onClose={() => setOpen(false)}
            placement="right" // O drawer abrirá de baixo para cima, estilo modal
            size="full" // O Drawer ocupa a tela inteira em dispositivos móveis
          >
            <Drawer.Header>
              <Drawer.Title>{cliente.nome}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Form fluid>
                <Form.Group controlId="name-1">
                  <Form.ControlLabel>Nome</Form.ControlLabel>
                  <Form.Control disabled name="name" value={cliente.nome} />
                </Form.Group>

                <Form.Group controlId="Telefone">
                  <Form.ControlLabel>Telefone</Form.ControlLabel>
                  <Form.Control
                    disabled
                    name="Telefone"
                    value={cliente.telefone}
                  />
                </Form.Group>

                <Form.Group controlId="email-1">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control disabled name="email" value={cliente.email} />
                </Form.Group>

                <Form.Group controlId="dataNascimento">
                  <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                  <Form.Control
                    disabled
                    name="dataNascimento"
                    value={cliente.dataNascimento}
                  />
                </Form.Group>

                <Form.Group controlId="Sexo">
                  <Form.ControlLabel>Sexo</Form.ControlLabel>
                  <Form.Control disabled name="Sexo" value={cliente.sexo} />
                </Form.Group>
              </Form>
            </Drawer.Body>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default ClienteMobile;
