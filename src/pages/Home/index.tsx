import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BG from "../../components/background/background";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MyCalendar from "../../components/Calendar/index";
import { useDispatch, useSelector } from "react-redux";
import { filterAgendamentoRequest } from "../../store/modules/agendamento/agendamentoSlice";

const localizer = momentLocalizer(moment);

export const Home = () => {
  const dispatch = useDispatch();

  // UseSelector to get the state from Redux
  const { data, loading, error } = useSelector(
    (state: any) => state.agendamento
  );

  const payload = {
    start: moment().startOf("week").format("YYYY-MM-DD"),
    end: moment().endOf("week").format("YYYY-MM-DD"),
  };

  useEffect(() => {
    dispatch(filterAgendamentoRequest(payload));
  }, [dispatch]);

  // Default date for the calendar
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  // Handling agendamentos from the data object
  const [agendamentos, setAgendamentos] = useState<any>([]);

  // Updating agendamentos if the data changes
  useEffect(() => {
    if (data && data.agendamentos) {
      setAgendamentos(data.agendamentos);
    }
  }, [data]);

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
        <MyCalendar localizer={localizer} events={agendamentos} defaultDate={defaultDate} />
      </div>
    </div>
  </>
  );
};

export default Home;
