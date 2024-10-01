import { useEffect } from "react";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "rsuite/dist/rsuite-no-reset.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  TagPicker,
  Drawer,
  Modal,
  Checkbox,
  DatePicker,
  Button,
  Notification,
} from "rsuite";
import BG from "../../components/background/background";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  updateHorario,
  closeDrawer,
  resetHorario,
  setColaboradores,
  setFiltering,
  setHorarios,
  setSaving,
  setServicos, // Importamos apenas as ações do slice
} from "../../store/modules/horarios/horariosSlice";
import util from "../../services/util";
import colors from "../../data/colors.json";

const localizer = momentLocalizer(moment);
moment.locale("pt-br");

const HorariosAtendimento = () => {
  const dispatch = useDispatch();
  const {
    horario,
    horarios,
    form,
    components,
    behavior,
    servicos,
    colaboradores,
    inicio,
    fim,
  } = useSelector((state) => state.horarios); // Atualizado para utilizar o slice

  const diasDaSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const diasSemanaData = Array.from({ length: 7 }, (v, i) => {
    const today = new Date(); // Obtém a data atual
    const dayOffset = i; // Offset para cada dia da semana
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayOffset,
      0,
      0,
      0,
      0
    );
  });

  const setHorario = (key, value) => {
    dispatch(
      updateHorario({
        horario: { ...horario, [key]: value },
      })
    );
  };

  const setComponents = (component, state) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    );
  };

  const onHorarioClick = (horario) => {
    dispatch(
      updateHorario({
        horario: {
          ...horario,
          // Ajusta o horário para UTC+3
          inicio: horario.inicio, // Garante que seja um string em formato ISO
          fim: horario.fim, // Faz o mesmo para o fim
        },
        behavior: "update",
      })
    );

    setComponents("drawer", true); // Abre o drawer para edição
  };

  const save = () => {
    if (
      !util.allFields(horario, [
        "dias",
        "inicio",
        "fim",
        "especialidades",
        "colaboradores",
      ])
    ) {
      Notification.error({
        placement: "topStart",
        title: "Calma lá!",
        description: "Antes de prosseguir, preencha todos os campos!",
      });
      return false;
    }

    if (behavior === "create") {
      dispatch({ type: "horarios/addHorario" }); // Chama o Saga responsável por adicionar horário
    } else {
      dispatch({ type: "horarios/saveHorario" }); // Chama o Saga responsável por salvar o horário
    }
  };

  const remove = () => {
    dispatch({ type: "horarios/removeHorario" }); // Chama o Saga responsável por remover horário
  };

  const formatEventos = () => {
    let listaEventos = [];

    horarios.forEach((hor, index) => {
      hor.dias.forEach((dia) => {
        // Cria a data base para o dia correspondente
        const baseDate = diasSemanaData[dia];

        // Converte 'inicio' e 'fim' para UTC e adiciona 3 horas
        const start = new Date(
          Date.UTC(
            baseDate.getUTCFullYear(),
            baseDate.getUTCMonth(),
            baseDate.getUTCDate(),
            moment.utc(hor.inicio).hour() + 3, // Adiciona 3 horas
            moment.utc(hor.inicio).minute()
          )
        );

        const end = new Date(
          Date.UTC(
            baseDate.getUTCFullYear(),
            baseDate.getUTCMonth(),
            baseDate.getUTCDate(),
            moment.utc(hor.fim).hour() + 3, // Adiciona 3 horas
            moment.utc(hor.fim).minute()
          )
        );

        listaEventos.push({
          resource: { horario: hor, backgroundColor: colors[index] },
          title: `${hor.especialidades.length} espec. e ${hor.colaboradores.length} colab. disponíveis`,
          start: start,
          end: end,
        });
      });
    });

    return listaEventos;
  };
  const horarinicio = horario.inicio
  useEffect(() => {
    dispatch({ type: "horarios/allHorarios" }); // Chama o Saga responsável por obter todos os horários
    dispatch({ type: "horarios/allServicos" }); // Chama o Saga responsável por obter todos os serviços
  }, []);

  useEffect(() => {
    dispatch({ type: "horarios/filterColaboradores" }); // Chama o Saga para filtrar colaboradores
  }, [horarios.servicos]);

  return (
    <>
      <BG />
      <Header />
      <Sidebar />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ maxHeight: "calc(100vh - 95px)", overflowY: "auto" }}
      >
        <div className="mt-5" style={{ width: "90%" }}>
          <div className="col p-5 overflow-auto h-100">
            <Drawer
              open={components.drawer}
              size="sm"
              onClose={() => setComponents("drawer", false)}
            >
              <Drawer.Body>
                <h3>{behavior == 'create'?"Criar novo Horário":"Atualizar Horário"}</h3>
                <div className="row mt-3">
                  {/* Dias da semana */}
                  <div className="col-12">
                    <b>Dias da semana</b>
                    <TagPicker
                      size="lg"
                      block
                      value={horario.dias}
                      data={diasDaSemana.map((label, value) => ({
                        label,
                        value,
                      }))}
                      onChange={(value) => {
                        setHorario("dias", value);
                      }}
                    />
                    <Checkbox
                      disabled={horario.dias.length === diasDaSemana.length}
                      checked={horario.dias.length === diasDaSemana.length}
                      onChange={(v, selected) => {
                        if (selected) {
                          setHorario(
                            "dias",
                            diasDaSemana.map((label, value) => value)
                          );
                        } else {
                          setHorario("dias", []);
                        }
                      }}
                    >
                      {" "}
                      Selecionar Todos
                    </Checkbox>
                  </div>
                  {/* Horário Inicial */}
                  <div className="col-6 mt-3">
                    <b className="d-block">Horário Inicial</b>
                    <DatePicker
                      block
                      format="HH:mm"
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      value={
                     
                        new Date(horarinicio).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
                      }
                      onChange={(date) => {
                        const selectedDate = new Date(date);
                        selectedDate.setSeconds(0, 0); // Reseta segundos e milissegundos
                        setHorario("inicio", selectedDate.toISOString());
                      }}
                    />
                  </div>
                  {/* Horário Final */}
                  <div className="col-6 mt-3">
                    <b className="d-block">Horário Final</b>
                    <DatePicker
                      block
                      format="HH:mm"
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      value={horario.fim ? new Date(horario.fim) : null} // Converter para Date
                      onChange={(e) => setHorario("fim", e)}
                    />
                  </div>
                  {/* Especialidades */}
                  <div className="col-12 mt-3">
                    <b>Especialidades disponíveis</b>
                    <TagPicker
                      size="lg"
                      block
                      data={servicos} // Use o array completo
                      labelKey="titulo" // Usa o 'titulo' como a label exibida
                      valueKey="_id" // Usa o '_id' como o identificador único
                      value={horario.especialidade} // Define os valores selecionados
                      onChange={(e) => {
                        setHorario("especialidade", e); // Atualiza os valores selecionados
                      }}
                    />

                    <Checkbox
                      disabled={
                        horario.especialidades.length === servicos.length
                      } // Desativa se todos já estiverem selecionados
                      checked={
                        horario.especialidades.length === servicos.length
                      } // Marca se todos estiverem selecionados
                      onChange={(value, checked) => {
                        if (checked) {
                          setHorario(
                            "especialidades",
                            servicos.map((s) => s._id) // Seleciona todas as especialidades (usando o _id como valor)
                          );
                        } else {
                          setHorario("especialidades", []); // Limpa a seleção se desmarcado
                        }
                      }}
                    >
                      Selecionar Todas
                    </Checkbox>
                  </div>

                  {/* Colaboradores */}
                  <div className="col-12 mt-3">
                    <b>Colaboradores disponíveis</b>
                    <TagPicker
                      size="lg"
                      block
                      data={horario.colaboradores}
                      disabled={horario.especialidades.length === 0}
                      value={horario.colaboradores}
                      onChange={(e) => {
                        setHorario("colaboradores", e);
                      }}
                    />
                    <Checkbox
                      disabled={
                        horario.colaboradores.length === colaboradores.length
                      }
                      checked={
                        horario.colaboradores.length === colaboradores.length
                      }
                      onChange={(v, selected) => {
                        if (selected) {
                          setHorario(
                            "colaboradores",
                            colaboradores.map((s) => s.value)
                          );
                        } else {
                          setHorario("colaboradores", []);
                        }
                      }}
                    >
                      {" "}
                      Selecionar Todos
                    </Checkbox>
                  </div>
                </div>
                <Button
                  loading={form.saving}
                  color={behavior === "create" ? "green" : "cyan"}
                  size="lg"
                  block
                  onClick={() => save()}
                  className="mt-3"
                >
                  Salvar Horário de Atendimento
                </Button>
                {behavior === "update" && (
                  <Button
                    loading={form.saving}
                    color="red"
                    size="lg"
                    block
                    onClick={() => setComponents("confirmDelete", true)}
                    className="mt-1"
                  >
                    Remover Horário de Atendimento
                  </Button>
                )}
              </Drawer.Body>
            </Drawer>

            <Modal
              show={components.confirmDelete}
              onHide={() => setComponents("confirmDelete", false)}
              size="xs"
            >
              <Modal.Body>
                {"  "} Tem certeza que deseja excluir? Essa ação será
                irreversível!
              </Modal.Body>
              <Modal.Footer>
                <Button
                  loading={form.saving}
                  onClick={() => remove()}
                  color="red"
                >
                  Sim, tenho certeza!
                </Button>
                <Button
                  onClick={() => setComponents("confirmDelete", false)}
                  appearance="subtle"
                >
                  Cancelar
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="row">
              <div className="col-12">
                <div className="w-100 d-flex justify-content-between">
                  <h2 className="mb-4 mt-0">Horarios de Atendimento</h2>
                  <div>
                    <button
                      onClick={() => setComponents("drawer", true)}
                      className="btn btn-primary btn-lg"
                      style={{ position: "relative", zIndex: "20" }}
                    >
                      <span className="mdi mdi-plus"></span> Novo Horario
                    </button>
                  </div>
                </div>

                <Calendar
                  localizer={localizer}
                  onSelectEvent={(e) => {
                    console.log(e.resource.horario); // Log do horário no console
                    onHorarioClick(e.resource.horario); // Chama a função para editar o horário
                  }}
                  onSelectSlot={(slotInfo) => {
                    const { start, end } = slotInfo;

                    // Ajuste para o fuso horário correto (por exemplo, São Paulo)
                    const startMoment = moment(start);
                    const endMoment = moment(end);

                    dispatch(
                      updateHorario({
                        horario: {
                          ...horario,
                          dias: [startMoment.day()], // Ajusta o dia com o fuso horário
                          inicio: startMoment, // Usa o horário ajustado
                          fim: endMoment, // Usa o horário ajustado
                        },
                      })
                    );
                    setComponents("drawer", true);
                  }}
                  events={formatEventos()} // Certifique-se de que os eventos estejam formatados corretamente
                  defaultView={components.view} // Use defaultView se for imutável
                  defaultDate={moment(diasSemanaData[moment().day()])} // Ajuste para o fuso horário
                  selectable={true}
                  popup={true}
                  toolbar={false}
                  style={{ height: 600 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorariosAtendimento;
