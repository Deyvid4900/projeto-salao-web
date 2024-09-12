import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BG from "../../components/background/background";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MyCalendar from "../../components/Calendar/index";

const localizer = momentLocalizer(moment);

export const Home = () => {
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
          <MyCalendar />
        </div>
      </div>
    </>
  );
};

export default Home;
