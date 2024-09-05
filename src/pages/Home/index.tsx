import React, { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BG from "../../components/background/background";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment, { now } from "moment";
import MyCalendar from "../../components/Calendar/index";

const localizer = momentLocalizer(moment);

export const Home = () => {
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  return (
    <>
      <BG></BG>
      <Header></Header>
      <Sidebar></Sidebar>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{}}
      >
        <div className="mt-5" style={{ width: "90%" }}>
          <MyCalendar localizer={localizer}></MyCalendar>
        </div>
      </div>
    </>
  );
};

export default Home;
