import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  Input,
  Notification,
  InputPicker,
  Loader,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllColaboradores } from "../../store/modules/colaborador/colaboradorSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  cadastrarClienteRequest,
  closeCadastroModal,
  setLoading,
} from "../../store/modules/clientes/clientesSlice";
import util from "../../services/util";
import "./Agendamento.css"; // Estilização personalizada
import Position from "rsuite/esm/internals/Overlay/Position";
import { addAgendamento } from "../../store/modules/agendamento/agendamentoSlice";

const AgendamentoPage = () => {
  // Estado para o dia, horário e especialista selecionados
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const { colaboradoresServico } = useSelector((state) => state.colaborador);
  const { saloes } = useSelector((state) => state.salao);
  const { isModalOpen, loading } = useSelector((state) => state.cliente);
  const { agenda } = useSelector((state) => state.agendamento);
  const location = useLocation();
  const navigate = useNavigate();
  const { servico } = location.state || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllColaboradores());
    dispatch({
      type: "servicos/findColaboradoreByServico",
      payload: servico._id,
    });
    dispatch(setLoading(false))
  }, []);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "M",
  });
  function mergeDateAndTimeWithOffset(dateString, timeObj) {
    // Parse the date as a Moment.js object
    const date = moment(dateString, "YYYY-MM-DD");
  
    // Add the time to the date
    const dateTime = date.set({
      hour: moment(timeObj.time, "HH:mm").hour(),
      minute: moment(timeObj.time, "HH:mm").minute(),
    });
  
    // Convert to UTC and subtract 3 hours
    const utcDateTime = dateTime.utc().subtract(3, 'hours');
  
    // Return the adjusted date and time in ISO 8601 format
    return utcDateTime.toISOString();
  }

  const handleConfirmar = () => {
    const dados = {
      clienteId: localStorage.getItem("cl_idtor"),
      salaoId: localStorage.getItem("_dSlun"),
      servicoId: servico._id,
      colaboradorId: selectedSpecialist,
      data: mergeDateAndTimeWithOffset(selectedDay, selectedHour),
    };
    dispatch({ type: "VERIFICAR_CLIENTE", payload: { navigate, dados } });
  };

  const generateHoursWithIds = (hours) => {
    return hours.map((hour, index) => ({
      id: `hour-${index}`, // Gerando ID único com o índice
      available: hour.length === 0, // Verificando se o slot está vazio
      time: `${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`, // Convertendo índice para horas e minutos
    }));
  };
  const hoursWithIds = generateHoursWithIds(hours);

  const handleCadastrarCliente = () => {
    const salao = saloes.salao || {};
    dispatch(cadastrarClienteRequest({ ...formData, salaoId: salao._id }));
  };

  const confirmarAgendamento = () => {
    // console.log("Agendamento confirmado!");
  };

  const colaboradoesArray = colaboradoresServico || [];
  const agendaArray = agenda.agenda || [];

  // Função para buscar os dias e horários disponíveis
  const getDaysAndHours = (specialist) => {
    setSelectedSpecialist(specialist._id);
    dispatch({
      type: "agendamento/filterDiasDisponiveis",
      action: {
        _id: servico._id,
        dia: null,
        colaboradorId: selectedSpecialist,
      },
    });

    const availableDays = agendaArray.map((item) => {
      const day = Object.keys(item)[0];
      return {
        id: day,
        label: day,
      };
    });
    setDays(availableDays);
  };

  // Função para selecionar um dia e buscar os horários disponíveis

  const handleDaySelection = (dayId) => {
    dispatch({
      type: "agendamento/filterDiasDisponiveis",
      action: {
        _id: servico._id,
        dia: selectedDay,
        colaboradorId: selectedSpecialist,
      },
    });
    setSelectedDay(dayId);

    // Encontrar a agenda selecionada pelo dia
    const selectedAgenda = agendaArray.find((item) => item[dayId]);
    // console.log(agendaArray);
    if (selectedAgenda) {
      const horariosColaboradores = selectedAgenda[dayId];
      const availableHoursSet = new Set(); // Usar um Set para evitar duplicatas

      // Iterar sobre os colaboradores e suas horas
      Object.values(horariosColaboradores).forEach((horarios) => {
        if (Array.isArray(horarios)) {
          horarios.forEach((hora) => {
            // Verifique se a hora está disponível antes de adicioná-la
            if (hora.available) {
              // Cria uma chave única combinando o id e o time
              const uniqueKey = `${hora.time}-${hora.id}`;
              availableHoursSet.add(uniqueKey); // Adiciona a chave ao Set
            }
          });
        }
      });

      // Converter o Set de volta para um array e construir objetos completos
      const availableHours = Array.from(availableHoursSet).map((uniqueKey) => {
        const [time, id] = uniqueKey.split("-"); // Divide a chave em time e id
        return {
          time,
          id,
          available: true, // ou qualquer outra propriedade que você queira manter
        };
      });

      // Atualizar o estado com as horas disponíveis
      setHours(availableHours);
    } else {
      // Caso não encontre a agenda, pode-se definir o estado como vazio
      setHours([]);
    }
  };

  if (loading==true) {
    return (
      <>
        <div className="overlay d-flex justify-content-center align-items-center">
          <Loader size="lg" /> {/* Loader do rsuite */}
        </div>

        <style jsx>{`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(
              128,
              128,
              128,
              0.5
            ); /* Fundo cinza transparente */
            z-index: 9999; /* Garante que o loader fique sobre os outros elementos */
          }
        `}</style>
      </>
    );
  }

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

      {/* Escolha de especialista */}
      <div className="especialista-selecao">
        {colaboradoesArray.length === 1 ? (
          <h4>Selecione especialista que faz o serviço</h4>
        ) : (
          <h4>Gostaria de escolher um especialista específico?</h4>
        )}

        <div className="especialista-opcoes-scroll mt-3">
          <div
            className={
              colaboradoesArray.length === 1 ? "" : "especialista-opcoes"
            }
          >
            {colaboradoesArray.map((specialist) => (
              <div key={specialist._id} className="especialista-card">
                <div
                  className="especialista-img-placeholder"
                  style={{
                    backgroundImage: `url(${util.AWS.bucketURL}/${specialist.foto})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }}
                ></div>
                <p className="mb-1">{specialist.nome}</p>
                <button
                  className={`btn-especialista ${
                    selectedSpecialist === specialist._id ? "ativo" : ""
                  }`}
                  onClick={() => {
                    getDaysAndHours(specialist);
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
      {days.length > 0 ? (
        <div className="datas">
          <h4>Para quando você gostaria de agendar?</h4>
          <div className="dias-semana-scroll mt-3">
            <div className="dias-semana">
              {days.map((day) => (
                <button
                  key={day.id} // Aqui o key deve ser único
                  className={`btn-dia ${selectedDay === day.id ? "ativo" : ""}`}
                  onClick={() => handleDaySelection(day.id)}
                >
                  {new Date(day.label).getUTCDate()}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Seção de horários */}
      {hours.length > 0 ? (
        <div className="horarios">
          <h4>Que horas?</h4>
          <div className="horas-disponiveis-scroll mt-3">
            {/* {console.log(hours)} */}

            {Array.isArray(hours) ? (
              <div className="horas-disponiveis">
                {hours.map((hour) => (
                  <button
                    key={hour.id}
                    className={`btn-hora ${
                      selectedHour === hour ? "ativo" : ""
                    }`}
                    onClick={() => setSelectedHour(hour)}
                  >
                    {hour.time}
                  </button>
                ))}
              </div>
            ) : (
              <h4 className="pt-4" style={{ textAlign: "center" }}>
                Nenhum Horário disponível
              </h4>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Botão de confirmação */}
      
      <button
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%", // Move o botão para o centro horizontalmente
          transform: "translateX(-50%)", // Ajusta o botão para ficar centralizado
          width: "95vw", // Mantém a largura do botão
        }}
        className="btn-confirmar"
        onClick={() => {
          handleConfirmar();
        }}
      >
        Confirmar meu agendamento
      </button>

      {/* Modal de cadastro */}
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
                value={formData.sexo}
                onChange={(value) =>
                  setFormData((prevData) => ({ ...prevData, sexo: value }))
                }
                searchable={false}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCadastrarCliente} appearance="primary">
            Cadastrar e Confirmar
          </Button>
          <Button
            onClick={() => dispatch(closeCadastroModal())}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
      </div>
    </div>
    
  );
};

export default AgendamentoPage;
