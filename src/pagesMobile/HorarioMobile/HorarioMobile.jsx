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
import util from "../../services/util";
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
    </>
  );
};

export default HorariosAtendimentoMobile;
