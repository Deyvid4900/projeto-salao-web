import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { filterAgendamentoRequest } from "../../store/modules/agendamento/agendamentoSlice";
import { Spinner } from "react-bootstrap";

// Configura o localizador de datas com Moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.agendamento);

  const [events, setEvents] = useState([]);

  // Busca agendamentos ao montar o componente
  useEffect(() => {
    const periodo = {
      start: moment().startOf("M").format("YYYY-MM-DD"),
      end: moment().endOf("M").format("YYYY-MM-DD"),
    };
    dispatch(filterAgendamentoRequest(periodo));
  }, [dispatch]);

  // Mapeia agendamentos para eventos do calendário
  useEffect(() => {
    if (data?.agendamentos) {
      const mappedEvents = data.agendamentos.map((e: any) => {
        const dataInicio = moment(e.data).toDate(); // Usa moment para garantir o formato correto da data
        const duracao = e.servicoId?.duracao || 0; // duração em minutos ou 0 se não definido
        const dataFim = moment(dataInicio).add(duracao, 'minutes').toDate(); // Adiciona a duração à data de início

        return {
          title: `Agendamento ${e.servicoId?.titulo || 'Serviço'} com ${e.clienteId?.nome || 'Cliente'} - ${e.colaboradorId?.nome || 'Colaborador'}`,
          start: dataInicio,
          end: dataFim,
        };
      });
      setEvents(mappedEvents);
    }
  }, [data]);

  // Formata o intervalo de datas
  const formatRange = (periodo: any) => {
    let finalRange = {};
    if (Array.isArray(periodo)) {
      finalRange = {
        start: moment(periodo[0]).format("YYYY-MM-DD"),
        end: moment(periodo[periodo.length - 1]).format("YYYY-MM-DD"),
      };
    } else {
      finalRange = {
        start: moment(periodo.start).format("YYYY-MM-DD"),
        end: moment(periodo.end).format("YYYY-MM-DD"),
      };
    }
    return finalRange;
  };

  // Dispara a ação de filtro ao mudar o range, mas só se for um range relevante
  const handleRangeChange = (periodo: any) => {
    const range = formatRange(periodo);
    console.log(events)
    // Verifica se o range realmente mudou
    if (periodo.start && periodo.end) {
      console.log('Range alterado:', range);
      dispatch(filterAgendamentoRequest(range)); // Dispara a action com o novo intervalo de datas
    }
  };

  // Exibe o Spinner enquanto carrega
  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}><Spinner animation="border" /></div>;
  }

  // Renderiza o calendário
  return (
    <div
      className="myCustomHeight"
      style={{
        zIndex: 2,
        position: "relative",
        height: "80vh",
        backgroundColor: "rgb(255 255 255 / 68%)",
      }}
    >
      <Calendar
        // onRangeChange={((range) => handleRangeChange(range))} // Dispara o dispatch na mudança de range
        localizer={localizer}
        events={events}
        defaultView="agenda"
        popup
        selectable
        />
    </div>
  );
};

export default MyCalendar;
