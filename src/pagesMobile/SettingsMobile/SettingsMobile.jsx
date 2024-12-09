import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const SettingsPage = () => {
  return (
    <>
    <HeaderMobile />
      <Container fluid>
        <Row className="my-4">
          <Col md={12}>
            <h2 className="text-center">Configurações de Agendamentos</h2>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Informações do Salão</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome do Salão</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite o nome do salão"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="Digite o telefone" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite o email" />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Salvar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Horários de Funcionamento</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Segunda a Sexta</Form.Label>
                    <InputGroup>
                      <FormControl type="time" placeholder="Início" />
                      <FormControl type="time" placeholder="Fim" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Sábado</Form.Label>
                    <InputGroup>
                      <FormControl type="time" placeholder="Início" />
                      <FormControl type="time" placeholder="Fim" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Domingo</Form.Label>
                    <FormControl type="text" placeholder="Fechado" disabled />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Atualizar Horários
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Configurações de Agendamento</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Notificação de Lembrete</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Ativar lembretes de agendamento"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Intervalo de Lembrete</Form.Label>
                    <Form.Control as="select">
                      <option>15 minutos</option>
                      <option>30 minutos</option>
                      <option>1 hora</option>
                      <option>2 horas</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Salvar Configurações
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingsPage;
