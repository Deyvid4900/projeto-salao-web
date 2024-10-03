import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import BG from "../../components/background/background";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MyCalendar from "../../components/Calendar/index";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";

const localizer = momentLocalizer(moment);

export const HomeMobile = () => {
  return (
    <>
      <HeaderMobile></HeaderMobile>
    </>
  );
};

export default HomeMobile;
