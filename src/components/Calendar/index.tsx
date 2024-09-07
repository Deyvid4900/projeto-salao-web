import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer
const myEventsList = [];

const MyCalendar = (props) => (
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
      localizer={localizer}
      events={[
        {
          title: "Evento Teste",
          start: moment().toDate(),
          end: moment().add(90, "minutes").toDate(),
        },
      ]}
      defaultView="week"
      popup
      selectable
    />
  </div>
);

export default MyCalendar;
