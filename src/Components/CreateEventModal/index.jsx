import React from "react";
import { ContainerModal, Form, WrapperForm, WrapperImage } from "./styled.js";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
//
import displayImg from "../../images/modal/date-picker.svg";

export function CreateEventModal({ isOpen, onClose, onEventAdd, ...rest }) {
  // Context
  // State
  const [title, set_title] = React.useState("");
  const [start, set_start] = React.useState();
  const [end, set_end] = React.useState();

  // handle Functions
  const onSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      title,
      start: new moment(start).format(""), //new moment(start).format("")
      // calender just accept ISO format
      end: new moment(end ? end : start).format(""),
      // calender just accept ISO format
    };

    // add in calender
    onEventAdd(newEvent);
    // Clear
    set_title("");
    set_start();
    set_end();
    // Close
    onClose();
  };

  function handleOnClose() {
    set_title("");
    set_start();
    set_end();
    // Close
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} {...rest}>
      <ContainerModal>
        <WrapperImage>
          <img src={displayImg} alt="" />
        </WrapperImage>
        <WrapperForm>
          <Form onSubmit={onSubmit}>
            <h1>Create Event</h1>
            <div className="wrap-input">
              <label>Event name</label>
              <input
                required
                className="event-name"
                type="text"
                value={title}
                onChange={(e) => set_title(e.target.value)}
              />
            </div>
            <div className="wrap-input-date">
              <div className="wrap-date">
                <label>Start event</label>
                <DateTimePicker
                  format="y-MM-dd HH:mm:ss"
                  required
                  value={start} // just accept new Date()
                  onChange={(date) => set_start(date)}
                />
              </div>
              <div className="wrap-date">
                <label>End event</label>
                <DateTimePicker
                  format="y-MM-dd HH:mm:ss"
                  value={end} // just accept new Date()
                  onChange={(date) => set_end(date)}
                />
              </div>
            </div>
            <div className="wrap-buttons">
              <button type="submit">Add Event</button>
              <button type="button" onClick={handleOnClose}>
                Cancel
              </button>
            </div>
          </Form>
        </WrapperForm>
      </ContainerModal>
    </Modal>
  );
}
