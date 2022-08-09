import React from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ContainerModal, Form, WrapperForm, WrapperImage } from "./styled.js";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
//
import editImg from "../../images/modal/edit-modal.svg";
import { deleteSubDocInDb } from "../../database/index.js";

export default function EditEventModal({
  data,
  isOpen,
  onClose,
  onEventAdd,
  onRemove,
  ...rest
}) {
  // Context
  const { userGoogle } = React.useContext(AuthContext);
  // State
  let id = data.id;
  const [title, set_title] = React.useState();
  const [start, set_start] = React.useState();
  const [end, set_end] = React.useState();

  // handle Functions
  const onSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      id: id,
      title: title ? title : data.title,
      start: moment(start ? start : data.start).format(),
      // calender just accept ISO format
      end: moment(end ? end : data.end ? data.end : data.start).format(),
      // calender just accept ISO format
      event: data.event,
    };
    // Clear
    set_title("");
    set_start("");
    set_end("");
    // add in calender
    onEventAdd(newEvent);
    // Close
    onClose();
  };

  async function handleRemoveData() {
    await deleteSubDocInDb("schedule", userGoogle.id, "events", data.id);
    data.event.remove();
    onClose();
  }

  function handleClose() {
    // Clear
    set_title("");
    set_start("");
    set_end("");
    // Close
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <ContainerModal>
        <WrapperImage>
          <img src={editImg} alt="" />
        </WrapperImage>
        <WrapperForm>
          <Form onSubmit={onSubmit}>
            <h1>Edit Event</h1>
            <div className="wrap-input">
              <label>Event name</label>
              <input
                required
                className="event-name"
                type="text"
                value={title ? title : data.title}
                onChange={(e) => set_title(e.target.value)}
              />
            </div>
            <div className="wrap-input-date">
              <div className="wrap-date">
                <label>Start event</label>
                <DateTimePicker
                  format="y-MM-dd HH:mm:ss"
                  required
                  value={start ? start : data.start} // just accept new Date()
                  onChange={(date) => set_start(date)}
                />
              </div>
              <div className="wrap-date">
                <label>End event</label>
                <DateTimePicker
                  format="y-MM-dd HH:mm:ss"
                  value={end ? end : data.end} // just accept new Date()
                  onChange={(date) => set_end(date)}
                />
              </div>
            </div>
            <div className="wrap-buttons">
              <button type="submit">Edit Event</button>
              <button type="button" onClick={handleRemoveData}>
                Remove Event
              </button>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </Form>
        </WrapperForm>
      </ContainerModal>
    </Modal>
  );
}
