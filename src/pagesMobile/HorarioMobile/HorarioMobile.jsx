// indexHorarios
import { useEffect } from "react";
import moment from "moment";
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
import util, { checkLocalStorageKeys } from "../../services/util";
import colors from "../../data/colors.json";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const localizer = momentLocalizer(moment);
moment.locale("pt-br");

const HorariosAtendimentoMobile = () => {
  const dispatch = useDispatch();
  const firstDay = getFirstDayOfWeek();
  const {
    horario,
    horarios,
    form,
    components,
    behavior,
    servicos,
    colaboradores,
    colaboradoresInfo,
  } = useSelector((state) => state.horarios); // Atualizado para utilizar o slice

  const colaboradoresInfoArray = colaboradoresInfo || [];

  const qtnServico = horario.especialidade || [];
  const qtnColaborador = horario.colaboradores || [];

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
    const currentDayOfWeek = today.getDay(); // Índice do dia da semana atual (0 para domingo, 1 para segunda, etc.)

    // Calcula a diferença entre o dia atual e o próximo domingo
    const dayOffset = i - currentDayOfWeek;

    // Cria a nova data com o offset para alinhar com o domingo como primeiro dia
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayOffset,
      0,
      0,
      0,
      0
    );

    return date; // Retorna a data ajustada
  });

  function getFirstDayOfWeek() {
    return moment().startOf("isoWeek").toDate(); // ISO week começa na segunda-feira
  }

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

  const handleDate = () => {
    console.log(horario.inicio);
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
  useEffect(() => {
    checkLocalStorageKeys()
    dispatch({ type: "horarios/allHorarios" }); // Chama o Saga responsável por obter todos os horários
    dispatch({ type: "horarios/allServicos" });
    // Chama o Saga responsável por obter todos os serviços
  }, []);

  useEffect(() => {
    dispatch({ type: "horarios/filterColaboradores" }); // Chama o Saga para filtrar colaboradores
  }, [horarios.servicos]);

  return (
    <>
      <HeaderMobile></HeaderMobile>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          maxHeight: "calc(100vh - 95px)",
          padding: "0 10px", // Adiciona padding para telas pequenas
        }}
      >
        <div className="mt-4" style={{ width: "100%", maxWidth: "1200px" }}>
          <div className="col  h-100">
            {/* Drawer Responsivo */}
            <Drawer
              open={components.drawer}
              size={window.innerWidth < 768 ? "full" : "sm"} // Ajusta o tamanho do Drawer dependendo do tamanho da tela
              onClose={() => setComponents("drawer", false)}
            >
              <Drawer.Body>
                <h3>
                  {behavior === "create"
                    ? "Criar novo Horário de atendimento"
                    : "Atualizar Horário de atendimento"}
                </h3>
                <div className=" mt-3">
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
                  <div className="col-12 col-md-6 mt-3">
                    <b className="d-block">Horário Inicial</b>
                    <DatePicker
                      block
                      format="HH:mm"
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      value={moment(horario.inicio).toDate()}
                      onChange={(date) => {
                        const selectedDate = new Date(date);
                        selectedDate.setSeconds(0, 0);
                        setHorario("inicio", selectedDate.toISOString());
                      }}
                    />
                  </div>

                  {/* Horário Final */}
                  <div className="col-12 col-md-6 mt-3">
                    <b className="d-block">Horário Final</b>
                    <DatePicker
                      block
                      format="HH:mm"
                      hideMinutes={(min) => ![0, 30].includes(min)}
                      value={horario.fim ? moment(horario.fim).toDate() : null}
                      onChange={(date) => {
                        const selectedDate = new Date(date);
                        selectedDate.setSeconds(0, 0);
                        setHorario("fim", selectedDate.toISOString());
                      }}
                    />
                  </div>

                  {/* Especialidades */}
                  <div className="col-12 mt-3">
                    <b>Especialidades disponíveis</b>
                    <TagPicker
                      size="lg"
                      block
                      data={servicos}
                      labelKey="titulo"
                      valueKey="_id"
                      value={horario.especialidade}
                      onChange={(e) => {
                        setHorario("especialidade", e);
                      }}
                    />

                    <Checkbox
                      disabled={qtnServico.length === servicos.length}
                      checked={qtnServico.length === servicos.length}
                      onChange={(value, checked) => {
                        if (checked) {
                          setHorario(
                            "especialidade",
                            servicos.map((s) => s._id)
                          );
                        } else {
                          setHorario("especialidades", []);
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
                      data={colaboradores}
                      labelKey="nome"
                      valueKey="_id"
                      onChange={(selected) =>
                        setHorario("colaboradores", selected)
                      }
                    />
                  </div>
                </div>

                <Button
                  loading={form.saving}
                  color={behavior === "create" ? "green" : "blue"}
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

            {/* Calendar Responsivo */}
            <div>
              <div className="col-12">
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <h4 className="mb-4 mt-0">Horarios de Atendimento</h4>
                </div>

                <Calendar
                  localizer={localizer}
                  onSelectEvent={(e) => {
                    onHorarioClick(e.resource.horario);
                    dispatch({ type: "horarios/allColaborador" });
                    dispatch({ type: "horarios/allColaboradoresSalao" });
                  }}
                  onSelectSlot={(slotInfo) => {
                    const { start, end } = slotInfo;

                    const startMoment = moment(start);
                    const endMoment = moment(end);

                    dispatch(
                      updateHorario({
                        horario: {
                          ...horario,
                          dias: [startMoment.day()],
                          inicio: startMoment,
                          fim: endMoment,
                        },
                      })
                    );
                    setComponents("drawer", true);
                  }}
                  events={formatEventos()}
                  defaultView={components.view}
                  selectable
                  popup
                  toolbar={false}
                  style={{
                    height: window.innerWidth < 768 ? 550 : 700,
                    width: window.innerWidth < 768 ? "100%" : 600,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(resetHorario());
          setComponents("drawer", true);
          dispatch(
            updateHorario({
              behavior: "create",
            })
          );
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
    </>
  );
};

export default HorariosAtendimentoMobile;
