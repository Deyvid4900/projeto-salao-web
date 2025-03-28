import React, { useState, useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  InputPicker,
  Loader,
  Text,
  useToaster,
  Notification,
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
import "./Agendamento.css";
import {
  updateDays,
  updateHours,
  updateLoading,
  updateSelectedSpecialist,
} from "../../store/modules/agendamento/agendamentoSlice";

const AgendamentoPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [indexDay, setIndexDay] = useState(null);
  const toaster = useToaster();
  

  // const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const { colaboradoresServico } = useSelector((state) => state.colaborador);
  const { saloes } = useSelector((state) => state.salao);
  const { isModalOpen, loading } = useSelector((state) => state.cliente);
  const {
    agenda,
    selectedSpecialist,
    days,
    hours,
    loadingAgendamento,
    components,
  } = useSelector((state) => state.agendamento);

  const location = useLocation();
  const navigate = useNavigate();
  const { servico } = location.state || {};
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "M",
  });
  const dispatch = useDispatch();
  const colaboradoesArray = colaboradoresServico || [];
  const agendaArray = agenda.agenda || [];

  useEffect(() => {
    dispatch(updateDays(""));
    dispatch(updateHours(""));
    dispatch(fetchAllColaboradores());
    dispatch({
      type: "servicos/findColaboradoreByServico",
      payload: servico._id,
    });
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    dispatch(updateSelectedSpecialist(colaboradoresServico));
  }, [colaboradoresServico]);

  const firstDayButtonRef = useRef(null); // Referência para o primeiro botão de dia
  const firstHourButtonRef = useRef(null); // Referência para o primeiro botão de horário

  // Focar no primeiro botão de dia quando os dias forem carregados
  useEffect(() => {
    if (days.payload && days.payload.length > 0) {
      firstDayButtonRef.current?.focus();
    }
  }, [days.payload]);

  // Focar no primeiro botão de horário quando os horários forem carregados
  useEffect(() => {
    if (hours.payload && hours.payload.length > 0) {
      firstHourButtonRef.current?.focus();
    }
  }, [hours.payload]);

  function mergeDateAndTimeWithOffset(dateString, timeString) {
    // Parse the date as a Moment.js object
    const date = moment(dateString, "YYYY-MM-DD");

    // Parse the time and extract hours and minutes
    const timeParts = timeString.split(":");
    const hour = parseInt(timeParts[0], 10);
    const minute = parseInt(timeParts[1], 10);

    // Set the hour and minute on the date
    date.set({ hour: hour, minute: minute });

    // Convert to UTC and subtract 3 hours
    const utcDateTime = date.utc().subtract(3, "hours");

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

  useEffect(() => {
    const { type, description } = components.notification;
    if (type && description) {
      toaster.push(
        <Notification
          type={type}
          header={type === "error" ? "Erro" : "Sucesso"}
          closable
        >
          {description}
        </Notification>,
        {
          placement: "bottomCenter",
          duration: 2000,
        }
      );
    }
  }, [components.notification, toaster]);

  const handleCadastrarCliente = () => {
    const salao = saloes.salao || localStorage.getItem("_dSlun");
    dispatch(cadastrarClienteRequest({ ...formData, salaoId: salao }));
  };

  const getDaysAndHours = (specialist) => {
    setSpecialist(specialist);
    dispatch({
      type: "agendamento/filterDiasDisponiveis",
      action: {
        _id: servico._id,
        dia: null,
        colaboradorId: specialist.payload[0]._id,
      },
    });

    const availableDays = agendaArray.map((item) => {
      const day = Object.keys(item)[0];
      return {
        id: day,
        label: day,
      };
    });
    updateDays(availableDays);
  };

  const handleDaySelection = (dayId) => {
    updateLoading(true);

    dispatch({
      type: "agendamento/filterHorasDisponiveis",
      action: {
        _id: servico._id,
        dia: selectedDay,
        colaboradorId: specialist.payload[0]._id,
        data: dayId,
      },
    });
    setSelectedDay(dayId);

    // Encontrar a agenda selecionada pelo dia
    const selectedAgenda = agendaArray.find((item) => item[dayId]);
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
      updateHours(availableHours);
    } else {
      // Caso não encontre a agenda, pode-se definir o estado como vazio
      updateHours([]);
    }
  };

  return (
    <div className="agendamento-container">
      {loading == true ? (
        <>
          <div
            className=" d-flex justify-content-center align-items-center "
            style={{
              position: "fixed",
              display: "none",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 2,
              cursor: "pointer",
            }}
          >
            <Loader size="lg" /> {/* Loader do rsuite */}
          </div>
        </>
      ) : (
        ""
      )}
      <div className="" style={{ overflowY: "auto", height: "90vh" }}>
        {/* Cabeçalho */}
        <div className="agendamento-header w-100" style={{textAlign:"center"}}>
          <h4>Finalizar Agendamento</h4>
        </div>
        {/* Serviço selecionado */}
        <div className="servico-card mb-4">
          <div className="servico-card__info">
            <div className="servico-card__img">
              {servico.arquivos?.[0]?.arquivo ? (
                <img
                  key={servico.arquivos[0]._id}
                  src={`${util.AWS.bucketURL}/${servico.arquivos[0].arquivo}`}
                  alt={servico.titulo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="servico-card__img-placeholder">
                  Imagem indisponível
                </div>
              )}
            </div>
            <div className="servico-card__detalhes">
              <p className="servico-card__titulo">{servico.titulo}</p>
              <p
                className="servico-card__descricao"
              >
                {servico.descricao}
              </p>
              <div className="servico-card__preco-container">
                <span className="servico-card__preco">
                  R$ {Number(servico.preco).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Escolha de especialista */}
        {colaboradoesArray.length == 0 ? (
          <div className=" d-flex justify-content-center align-items-center">
            <Loader size="lg" /> {/* Loader do rsuite */}
          </div>
        ) : (
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
                        getDaysAndHours(selectedSpecialist);
                      }}
                    >
                      Escolher Especialista
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {days.payload && days.payload.length > 0 ? (
          <div className="datas" >
            <h4>Para quando você gostaria de agendar?</h4>
            <div className="dias-semana-scroll mt-3">
              <div className="dias-semana" style={{}}>
                {days.payload.map((day, index) => (
                  <button
                  ref={index === 0 ? firstDayButtonRef : null}
                    key={index} // Usando o índice como key já que não há um `id`
                    className={`btn-dia ${selectedDay === day ? "ativo" : ""}`}
                    onClick={() => {
                      handleDaySelection(day);
                      setIndexDay(index);
                    }}
                  >
                    {new Date(day).getUTCDate()}/
                    {new Date(day).getUTCMonth() + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : loadingAgendamento == true ? (
          <div className=" d-flex justify-content-center align-items-center">
            <Loader size="lg" />
          </div>
        ) : (
          ""
        )}
        {hours.payload ? (
          <div className="horarios">
            <h4>Que horas?</h4>
            {loadingAgendamento == true ? (
              <div className=" d-flex justify-content-center align-items-center">
                <Loader size="md" />
              </div>
            ) : (
              <div className="horas-disponiveis-scroll mt-3">
                <div className="horas-disponiveis">
                  {hours.payload.map((hour, index) => (
                    <button
                    ref={index === 0 ? firstHourButtonRef : null} // Define a referência para o primeiro botão
                    
                      key={index} // Usando o índice como key já que não há um `id`
                      className={`btn-hora ${
                        selectedHour === hour ? "ativo" : ""
                      }`}
                      onClick={() => setSelectedHour(hour)}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : hours.payload && hours.payload.length == 0 ? (
          <div className=" d-flex justify-content-center align-items-center">
            Sem Horários para esse dia
          </div>
        ) : (
          ""
        )}
        {/* Botão de confirmação */}
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
                <Form.ControlLabel>
                  Nome{" "}
                  <Text as="sup" color="red">
                    *
                  </Text>{" "}
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Digite seu nome (Obrigatorio)"
                  name="nome"
                  required
                />
              </Form.Group>
              <Form.Group controlId="telefone">
                <Form.ControlLabel>Telefone </Form.ControlLabel>
                <Form.Control
                  placeholder="Digite seu Telefone"
                  type="tel"
                  name="telefone"
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  placeholder="Digite seu Email"
                  name="email"
                  type="email"
                  required
                />
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
              Cadastrar
            </Button>
            <Button
              onClick={() => dispatch(closeCadastroModal())}
              appearance="subtle"
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        <div></div>
      </div>
      {selectedHour != undefined ? (
        <button
          style={{
            bottom: 0,
            width: "100%",
            margin: "0px auto 5px auto",
          }}
          className="btn-confirmar"
          onClick={() => {
            handleConfirmar();
          }}
        >
          Confirmar meu agendamento
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AgendamentoPage;
