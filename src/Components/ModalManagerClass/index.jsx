import React from "react";
//
import Modal from "react-modal";
//
import {
  DisplayContainer,
  Form,
  FormContainer,
  WrapperForm,
  WrapperModal,
} from "./styles.js";
//
import display from "../../images/managerClass/professor.svg";
//
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
// schema
const manageClassSchema = yup
  .object({
    nameClass: yup.string().required(),
    tutor: yup.string().required(),
    tutorRegister: yup.string().required(),
    subject: yup.string().required(),
    subject: yup.string().required(),
    grade: yup.string().required().min(3),
    countStudents: yup.number().moreThan(0).required(),
    limitStudents: yup.number().moreThan(0).required(),
  })
  .required();

export function ModalManagerClass({ isOpen, onClose, onCreate, ...rest }) {
  // Hooks
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(manageClassSchema),
  });
  const getErrors = (field) =>
    errors[field] && errors[field].message.replace(field, "");

  // handle functions
  function onSubmit(dataForm) {
    let isFull =
      dataForm.countStudents >= dataForm.limitStudents ? "FULL" : "AVAILABLE";
    onCreate({...dataForm,isFull});
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} {...rest}>
      <WrapperModal>
        <DisplayContainer>
          <img src={display} alt="teacher" />
        </DisplayContainer>
        <FormContainer>
          <WrapperForm>
            <h1>Create a class</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="wrap-input">
                <label>Name of Class</label>
                <input
                  type="text"
                  placeholder="class"
                  name="nameClass"
                  {...register("nameClass")}
                />
                <small>{getErrors("nameClass")}</small>
              </div>
              <div className="wrap-input">
                <label>Name of Tutor</label>
                <input
                  type="text"
                  placeholder="tutor"
                  name="tutor"
                  {...register("tutor")}
                />
                <small>{getErrors("tutor")}</small>
              </div>
              <div className="wrap-input">
                <label>Register Number of Tutor</label>
                <input
                  type="text"
                  placeholder="Register Number of Tutor"
                  name="tutorRegister"
                  {...register("tutorRegister")}
                />
                <small>{getErrors("tutorRegister")}</small>
              </div>
              <div className="wrap-input">
                <label>Subject</label>
                <select
                  type="text"
                  placeholder="subject"
                  name="subject"
                  {...register("subject")}
                >
                  <option value=""></option>
                  <option value="MATH">MATH</option>
                  <option value="PHYSICS">PHYSICS</option>
                  <option value="CHEMISTRY">CHEMISTRY</option>
                  <option value="SCIENCE">SCIENCE</option>
                  <option value="ENGLISH">ENGLISH</option>
                  <option value="ARTS">ARTS</option>
                </select>
                <small>{getErrors("subject")}</small>
              </div>
              <div className="wrap-input">
                <label>Grade</label>
                <select
                  type="text"
                  placeholder="grade"
                  name="grade"
                  {...register("grade")}
                >
                  <option value=""></option>
                  <option value="year 1">year 1</option>
                  <option value="year 2">year 2</option>
                  <option value="year 3">year 3</option>
                  <option value="year 4">year 4</option>
                  <option value="year 5">year 5</option>
                  <option value="year 6">year 6</option>
                  <option value="form 1">form 1</option>
                  <option value="form 2">form 2</option>
                  <option value="form 3">form 3</option>
                  <option value="form 4">form 4</option>
                  <option value="form 5">form 5</option>
                </select>
                <small>{getErrors("grade")}</small>
              </div>
              <div className="wrap-input">
                <label>Count of Students</label>
                <input
                  type="number"
                  placeholder="Count of Students in room"
                  name="countStudents"
                  {...register("countStudents")}
                />
                <small>{getErrors("countStudents")}</small>
              </div>
              <div className="wrap-input">
                <label>Limit of Students</label>
                <input
                  type="number"
                  placeholder="Limit of Students in room"
                  name="limitStudents"
                  {...register("limitStudents")}
                />
                <small>{getErrors("limitStudents")}</small>
              </div>
              <button type="submit">Create</button>
            </Form>
            <button onClick={() => onClose(!isOpen)}>Cancel</button>
          </WrapperForm>
        </FormContainer>
      </WrapperModal>
    </Modal>
  );
}
