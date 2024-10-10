import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'moment/dist/locale/pt-br'// Corrige o locale para português do Brasil
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { filterAgendamentos } from "../../store/modules/agendamento/agendamentoActions";
import { Drawer, Button, DatePicker, SelectPicker } from "rsuite";
import { Spinner } from "react-bootstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css"; // Arquivo para customizações adicionais
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
import { fetchAllClientesRequest } from "../../store/modules/clientes/clientesSlice";
import { fetchAllColaboradores } from "../../store/modules/colaborador/colaboradorSlice";
import {
  setColaboradorId,
  setSelectedServicos,
} from "../../store/modules/servicos/servicosSlice";
import { addAgendamento } from "../../store/modules/agendamento/agendamentoSlice";

moment.locale("pt-br"); // Configura o Moment.js para usar o idioma português
const localizer = momentLocalizer(moment);

const HomeMobile = () => {
  const dispatch = useDispatch();
  const { agendamentos, loading } = useSelector((state) => state.agendamento);
  const { clientes } = useSelector((state) => state.cliente);
  const { selectedServico } = useSelector((state) => state.servicos);
  const { colaboradores } = useSelector((state) => state.colaborador);
  const [events, setEvents] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado do Drawer
  const [formValues, setFormValues] = useState({
    clienteId: "",
    salaoId: localStorage.getItem("_dSlun"),
    servicoId: "",
    colaboradorId: "",
    data: new Date() || "",
  });
  const clientesArray = clientes.clientes || [];
  const servicosArray = selectedServico || [];

  useEffect(() => {
    const periodo = {
      start: moment().startOf("M").format("YYYY-MM-DD"),
      end: moment().endOf("M").format("YYYY-MM-DD"),
    };
    dispatch(filterAgendamentos(periodo));

    dispatch(fetchAllClientesRequest());
    dispatch(fetchAllColaboradores());
  }, [dispatch]);

  useEffect(() => {
    if (agendamentos) {
      const mappedEvents = agendamentos.map((e) => {
        const dataInicio = moment(e.data).utcOffset(+6).toDate(); // Converte de UTC para o horário local
        const duracao = e.servicoId?.duracao || 0;
        const dataFim = moment(dataInicio).add(duracao, "minutes").toDate();
    
        return {
          title: `Agendamento ${e.servicoId?.titulo || "Serviço"} com ${
            e.clienteId?.nome || "Cliente"
          } - ${e.colaboradorId?.nome || "Colaborador"}`,
          start: dataInicio,
          end: dataFim,
        };
      });
      setEvents(mappedEvents);
    }
    
  }, [agendamentos]);

  const handleRangeChange = (periodo) => {
    const range = {
      start: moment(periodo.start || periodo[0]).format("YYYY-MM-DD"),
      end: moment(
        periodo.end || periodo[1] || periodo[periodo.length - 1]
      ).format("YYYY-MM-DD"),
    };
    dispatch(filterAgendamentos(range));
  };

  const handleAddAgendamento = () => {
    const agendamentoData = {
      ...formValues,
      data: moment(formValues.data).format(),
    };
    console.log(agendamentoData);

    // Dispatch para criar o agendamento
    dispatch(addAgendamento(agendamentoData));

    setDrawerOpen(false); // Fecha o Drawer após salvar
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
      <HeaderMobile />
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
        <h4 className="mb-3 mt-3 text-center">Agendamentos</h4>
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

          culture="pt-br"
          onRangeChange={(range) => handleRangeChange(range)}
          localizer={localizer}
          events={events}
          defaultView="day"
          popup
          selectable
          style={{ height: "87%", fontSize: "0.8rem" }}
        />
      </div>

      {/* Botão para abrir o Drawer */}
      <button
        onClick={() => setDrawerOpen(true)}
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
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        <span className="material-symbols-outlined text-white">add</span>
      </button>

      {/* Drawer para adicionar agendamento */}
      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="md"
        style={{ width: "100vw" }}
      >
        <Drawer.Header>
          <Drawer.Title>Novo Agendamento</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div className="col-12 mt-3">
            <b className="d-block">Especialista</b>
            <SelectPicker
              data={colaboradores}
              labelKey="nome" // Exibe o nome do colaborador
              valueKey="_id" // Usa o ID do colaborador como valor
              searchable={false}
              size="lg"
              placeholder="Selecione o colaborador"
              onChange={(value) => {
                setFormValues({ ...formValues, colaboradorId: value });

                // Dispatch da ação com o ID do colaborador
                dispatch(setColaboradorId(value));
              }}
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-12 mt-3">
            <b className="d-block">Serviço</b>
            <SelectPicker
              data={servicosArray}
              labelKey="titulo"
              valueKey="_id"
              searchable={false}
              size="lg"
              placeholder="Selecione o serviço"
              value={formValues.servicoId}
              onChange={(value) =>
                setFormValues({ ...formValues, servicoId: value })
              }
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-12 mt-3">
            <b className="d-block">Cliente</b>
            <SelectPicker
              data={clientesArray}
              labelKey="nome"
              valueKey="_id"
              searchable={false}
              size="lg"
              placeholder="Selecione o cliente"
              value={formValues.clienteId}
              onChange={(value) =>
                setFormValues({ ...formValues, clienteId: value })
              }
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-12 mt-3">
            <b className="d-block">Data</b>
            <DatePicker
              format="MM/dd/yyyy"
              placeholder="Selecione a data"
              value={formValues.data}
              onChange={(value) =>
                setFormValues({ ...formValues, data: value })
              }
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-12 mt-3">
            <b className="d-block">Horário</b>
            <DatePicker
              format="HH:mm"
              placeholder="Selecione o horário"
              value={formValues.data}
              onChange={(value) =>
                setFormValues({ ...formValues, data: value })
              }
              style={{ width: "100%" }}
            />
          </div>
          <Drawer.Actions className="mt-5">
            <Button onClick={handleAddAgendamento} appearance="primary">
              Salvar
            </Button>
            <Button onClick={() => setDrawerOpen(false)} appearance="subtle">
              Cancelar
            </Button>
          </Drawer.Actions>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default HomeMobile;
