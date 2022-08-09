//
import React from "react";
import FullCalendar from "@fullcalendar/react"; // keep this import above the ones below, so you don't get an error
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext";
import { CalenderContext } from "../../Contexts/CalenderContext/index.jsx";
import { addSubDocInDb, db, updateSubDocInDb } from "../../database";
import themes from "../../themes/themes.json";
import { CreateEventModal } from "../CreateEventModal/index.jsx";
import EditEventModal from "../EditEventModal";
import { CalenderContainer, WrapperCalenderContainer } from "./styled.js";

export default function Calender({ width, height }) {
  // Context
  const { userGoogle } = React.useContext(AuthContext);
  const { CURRENT_EVENT, SET_CURRENT_EVENT } =
    React.useContext(CalenderContext);
  // hooks
  const calenderRef = React.useRef(null);
  // States
  const [OPEN_MODAL, SET_OPEN_MODAL] = React.useState(false);
  const [OPEN_EDIT_MODAL, SET_OPEN_EDIT_MODAL] = React.useState(false);
  const [EVENTS, SET_EVENTS] = React.useState(false);

  // Effects
  React.useEffect(() => {
    db.collection("schedule")
      .doc(userGoogle?.id)
      .collection("events")
      .get()
      .then((data) => {
        let snap = data.docs.map((x) => {
          let data = x.data();
          let id = x.id;
          return {
            ...data,
            id,
          };
        });
        SET_EVENTS(snap);
      });
  }, [userGoogle]);

  // Handle Functions
  async function handleEventAdd(event) {
    const calenderApi = calenderRef.current.getApi();
    calenderApi.addEvent(event);
    // add envent in firebase
    const data = { ...event, ref: userGoogle?.id };
    try {
      await addSubDocInDb("schedule", userGoogle?.id, "events", data);
    } catch (error) {
      toast(error);
    }
  }

  async function handleClickEditEvent(dataEv) {
    const calenderApi = calenderRef.current.getApi();
    const id = dataEv.id;
    dataEv.event.remove();
    calenderApi.addEvent(dataEv);
    delete dataEv.event;
    try {
      await updateSubDocInDb("schedule", userGoogle?.id, "events", id, dataEv);
    } catch (error) {
      toast(error);
    }
  }

  function handleEventClick(e) {
    const ev = {
      id: e.event.id,
      title: e.event.title,
      start: e.event.start,
      end: e.event.end,
      event: e.event,
    };
    SET_CURRENT_EVENT(ev);
    SET_OPEN_EDIT_MODAL(!OPEN_EDIT_MODAL);
  }

  return (
    <WrapperCalenderContainer>
      <CalenderContainer
        width={width}
        height={height}
        style={{
          position: "relative",
          zIndex: 0,
        }}
      >
        <FullCalendar
          ref={calenderRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          eventBackgroundColor={themes["dark-primary-color"]}
          eventClick={handleEventClick}
          events={EVENTS}
          dateClick={(e) => {
            SET_OPEN_MODAL(!OPEN_MODAL);
          }}
        />
      </CalenderContainer>
      <CreateEventModal
        isOpen={OPEN_MODAL}
        onClose={() => SET_OPEN_MODAL(!OPEN_MODAL)}
        onEventAdd={handleEventAdd}
      />
      <EditEventModal
        data={CURRENT_EVENT}
        isOpen={OPEN_EDIT_MODAL}
        onClose={() => SET_OPEN_EDIT_MODAL(!OPEN_EDIT_MODAL)}
        onEventAdd={handleClickEditEvent}
      />
    </WrapperCalenderContainer>
  );
}
