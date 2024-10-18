import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button, Form, Input, Notification, InputPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllColaboradores } from "../../store/modules/colaborador/colaboradorSlice";
import {
  cadastrarClienteRequest,
  closeCadastroModal,
} from "../../store/modules/clientes/clientesSlice";
import util from "../../services/util";
import "./Agendamento.css"; // Estilização personalizada

const AgendamentoPage = () => {
  // Estado para o dia, horário e especialista selecionados
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const { colaboradoresServico } = useSelector((state) => state.colaborador);
  const { saloes } = useSelector((state) => state.salao);
  const { isModalOpen } = useSelector((state) => state.cliente);
  const location = useLocation();
  const { servico } = location.state || {};

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(servico);
    dispatch(fetchAllColaboradores());
    dispatch({
      type: "servicos/findColaboradoreByServico",
      payload: servico._id,
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "M",
  });

  const handleConfirmar = () => {
    dispatch({ type: "VERIFICAR_CLIENTE" });
  };

  const handleCadastrarCliente = () => {
    const salao = saloes.salao || {};
    console.log(salao);
    dispatch(cadastrarClienteRequest({ ...formData, salaoId: salao._id }));
  };

  const confirmarAgendamento = () => {
    console.log("Agendamento confirmado!");
  };

  const colaboradoesArray = colaboradoresServico || [];

  // Função para gerar os dias da semana atual e da próxima
  const generateDays = () => {
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const today = new Date();
    let days = [];

    // Semana atual
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date();
      currentDay.setDate(today.getDate() + i);
      const dayLabel = `${daysOfWeek[currentDay.getDay()]} ${
        currentDay.getDate() < 9
          ? "0" + currentDay.getDate()
          : currentDay.getDate()
      } ${currentDay.toLocaleString("default", { month: "short" })}`;
      days.push({ id: i, label: dayLabel });
    }

    // Próxima semana
    for (let i = 7; i < 14; i++) {
      const currentDay = new Date();
      currentDay.setDate(today.getDate() + i);
      const dayLabel = `${daysOfWeek[currentDay.getDay()]} ${
        currentDay.getDate() < 9
          ? "0" + currentDay.getDate()
          : currentDay.getDate()
      } ${currentDay.toLocaleString("default", { month: "short" })}`;
      days.push({ id: i, label: dayLabel });
    }

    return days;
  };

  const days = generateDays();

  const hours = ["10:00", "11:00", "11:30", "12:00", "12:30", "13:00"];

  const specialists = [
    { id: 1, name: "Silvio Sampaio" },
    { id: 2, name: "Maria Oliveira" },
    { id: 3, name: "João Silva" },
  ];

  return (
    <div className="agendamento-container">
      {/* Cabeçalho */}
      <div className="agendamento-header">
        <h4>Finalizar Agendamento</h4>
        <p>Escolha o horário e a data</p>
      </div>

      {/* Serviço selecionado */}
      <div className="servico-selecionado">
        <div className="servico-info">
          <div className="servico-img-placeholder">
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              key={servico.arquivos[0]?._id}
              src={`${util.AWS.bucketURL}/${servico.arquivos[0]?.arquivo}`}
              alt={servico.titulo}
            />
          </div>
          <div className="servico-detalhes">
            <p>{servico.titulo}</p>
            <p>{servico.descricao}</p>
            <p className="preco">R$ {Number(servico.preco).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="especialista-selecao">
        {colaboradoesArray.length == 1 ? (
          <h4>Especialista que faz o serviço</h4>
        ) : (
          <h4>Gostaria de escolher um especialista específico?</h4>
        )}

        <div className="especialista-opcoes-scroll mt-3">
          <div
            className={
              colaboradoesArray.length == 1 ? "" : "especialista-opcoes"
            }
          >
            {colaboradoesArray.map((specialist) => (
              <div key={specialist._id} className="especialista-card">
                <div className="especialista-img-placeholder"></div>
                <p className="mb-1">{specialist.nome}</p>
                <button
                  className={
                    colaboradoesArray.length == 1
                      ? "ativo btn-especialista"
                      : "" ||
                        `btn-especialista  ${
                          colaboradoesArray.length > 1 &&
                          selectedSpecialist === specialist._id
                            ? "ativo"
                            : ""
                        }`
                  }
                  onClick={() => {
                    setSelectedSpecialist(specialist._id);
                  }}
                >
                  Escolher Especialista
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Seção de datas */}
      <div className="datas">
        <h4>Pra quando você gostaria de agendar?</h4>
        <div className="dias-semana-scroll mt-3">
          <div className="dias-semana">
            {days.map((day) => (
              <button
                key={day.id}
                className={`btn-dia ${selectedDay === day.id ? "ativo" : ""}`}
                onClick={() => setSelectedDay(day.id)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seção de horas */}
      <div className="horarios">
        <h4>Que horas?</h4>
        <div className="horas-disponiveis-scroll mt-3">
          <div className="horas-disponiveis">
            {hours.map((hour) => (
              <button
                key={hour}
                className={`btn-hora ${selectedHour === hour ? "ativo" : ""}`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Escolher especialista */}

      {/* Botão de confirmação */}
      <button
        className="btn-confirmar"
        onClick={() => {
          console.log(selectedDay, selectedHour, selectedSpecialist);
          console.log(servico);
          handleConfirmar();
        }}
      >
        Confirmar meu agendamento
      </button>

      <Modal open={isModalOpen} onClose={() => setOpen(false)}>
        <Modal.Body>
          <h5 className="mx-auto mb-4" style={{ textAlign: "center" }}>
            Cadastre-se antes de agendar
          </h5>
          <Form
            fluid
            onChange={(value) => setFormData(value)}
            formValue={formData}
          >
            <Form.Group controlId="nome">
              <Form.ControlLabel>Nome</Form.ControlLabel>
              <Form.Control name="nome" required />
            </Form.Group>
            <Form.Group controlId="telefone">
              <Form.ControlLabel>Telefone</Form.ControlLabel>
              <Form.Control name="telefone" required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" required />
            </Form.Group>
            <Form.Group controlId="dataNascimento">
              <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
              <Form.Control name="dataNascimento" type="date" required />
            </Form.Group>
            <Form.Group controlId="sexo">
              <Form.ControlLabel>Sexo</Form.ControlLabel>
              <InputPicker
                className="w-50"
                data={[
                  { label: "Masculino", value: "M" },
                  { label: "Feminino", value: "F" },
                  { label: "Outro", value: "F" },
                ]}
                value={formData.sexo} // Mantém o valor atualizado
                onChange={(value) => {
                  // Atualiza o estado com o valor selecionado
                  setFormData((prevData) => ({ ...prevData, sexo: value }));
                }}
                searchable={false} // Desabilita a busca se não for necessário
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCadastrarCliente} appearance="primary">
            Cadastrar
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              dispatch(closeCadastroModal());
            }}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header >
          <Modal.Title className="p-1" ></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mx-auto mb-4" style={{textAlign:"center"}}> Cadastre-se antes de agendar</h5>
          <Form fluid onChange={(value) => setFormData(value)}>
            <Form.Group controlId="nome">
              <Form.ControlLabel>Nome</Form.ControlLabel>
              <Form.Control name="nome" />
            </Form.Group>
            <Form.Group controlId="telefone">
              <Form.ControlLabel>Telefone</Form.ControlLabel>
              <Form.Control name="telefone" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group controlId="dataNascimento">
              <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
              <Form.Control name="dataNascimento" type="date" />
            </Form.Group>
            <Form.Group controlId="sexo">
              <Form.ControlLabel>Sexo</Form.ControlLabel>
              <Form.Control name="sexo" accepter="select" defaultValue="M">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCadastroCliente} appearance="primary">
            Cadastrar
          </Button>
          <Button onClick={() => setOpen(false)} appearance="subtle">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AgendamentoPage;
