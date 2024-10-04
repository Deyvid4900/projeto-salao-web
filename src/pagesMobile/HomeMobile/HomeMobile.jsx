import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/pt-br'; // Corrige o locale para português do Brasil
import { useDispatch, useSelector } from "react-redux";
import { filterAgendamentos } from "../../store/modules/agendamento/agendamentoActions";
import { Spinner } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css"; // Arquivo para customizações adicionais
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

moment.locale('pt-br'); // Configura o Moment.js para usar o idioma português
const localizer = momentLocalizer(moment);

const HomeMobile = () => {
  const dispatch = useDispatch();
  const { agendamentos, loading } = useSelector((state) => state.agendamento);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const periodo = {
      start: moment().startOf("M").format("YYYY-MM-DD"),
      end: moment().endOf("M").format("YYYY-MM-DD"),
    };
    dispatch(filterAgendamentos(periodo));
  }, []);

  useEffect(() => {
    const periodo = {
      start: moment().startOf("M").format("YYYY-MM-DD"),
      end: moment().endOf("M").format("YYYY-MM-DD"),
    };
    dispatch(filterAgendamentos(periodo));
  }, [dispatch]);

  useEffect(() => {
    if (agendamentos) {
      const mappedEvents = agendamentos.map((e) => {
        const dataInicio = moment(e.data).toDate(); 
        const duracao = e.servicoId?.duracao || 0;
        const dataFim = moment(dataInicio).add(duracao, 'minutes').toDate(); 

        return {
          title: `Agendamento ${e.servicoId?.titulo || 'Serviço'} com ${e.clienteId?.nome || 'Cliente'} - ${e.colaboradorId?.nome || 'Colaborador'}`,
          start: dataInicio,
          end: dataFim,
        };
      });
      setEvents(mappedEvents);
    }
  }, [agendamentos]);

  const formatRange = (periodo) => {
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

  const handleRangeChange = (periodo) => {
    const range = formatRange(periodo);
    if (periodo.start && periodo.end) {
      dispatch(filterAgendamentos(range));
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
     <HeaderMobile></HeaderMobile>
      <div
        className="myCustomHeight"
        style={{
          zIndex: 2,
          position: "relative",
          height: "80vh",
          backgroundColor: "rgb(255 255 255 / 68%)",
          padding: "5px",
        }}
      >
        <h4 className="mb-3 mt-3 text-center" >
          Agendamentos
        </h4>
        <Calendar
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            date: "Data",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Nada agendado",
          }}
          culture="pt-br" // Cultura correta para o calendário
          onRangeChange={(range) => handleRangeChange(range)}
          localizer={localizer}
          events={events}
          defaultView="agenda"
          popup
          selectable
          style={{ height: "95%", fontSize: "0.8rem" }}
        />
      </div>
    </>
  );
};

export default HomeMobile;
