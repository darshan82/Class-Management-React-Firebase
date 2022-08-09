import React, { useState } from "react";
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
import {storage} from "../../database/index.js";
import {LoadSpinner} from '../LoadSpinner'
//
// schema
const studentSchema = yup
  .object({
    avatar: yup.mixed(),
    nameStudent: yup.string().required(),
    birth: yup.date().required(),
    grade: yup.string().required(),
    phone: yup.string().required(),
    nationalNumberId: yup.string().required(),
    classRegister: yup.string().required(),
    paymentDues: yup.number().required().moreThan(0),
  })
  .required();

export function ModalAddStudents({ isOpen, onClose, onCreate, ...rest }) {
  // Hooks
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  });
  const getErrors = (field) =>
    errors[field] && errors[field].message.replace(field, "");
  // States
  const [LOAD,SET_LOAD] = useState(false)


  // handle functions
  async function onSubmit(dataForm) {
    SET_LOAD(true)
    dataForm.createdAt = new Date() 
    let pic = dataForm['avatar'][0];
    let picLen = dataForm['avatar'].length
    dataForm['avatar'] = ""
    if(picLen >= 1){
      let storageRef = storage.ref("students/"+pic.name)
      let loaded = await storageRef.put(pic)
      let url = await loaded.ref.getDownloadURL()
      dataForm.avatar = url
    };
    SET_LOAD(false)
    onCreate(dataForm);
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
            <h1>Add a Student</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="wrap-input">
                <label>Picture</label>
                <input
                  type="file"
                  placeholder="picture"
                  name="avatar"
                  {...register("avatar")}
                />
                <small>{getErrors("avatar")}</small>
                <div className="wrap-input">
                  <label>Name of Student</label>
                  <input
                    type="text"
                    placeholder="Name of Student"
                    name="nameStudent"
                    {...register("nameStudent")}
                  />
                  <small>{getErrors("nameStudent")}</small>
                </div>
              </div>
              <div className="wrap-input">
                <label>Birth of Student</label>
                <input
                  type="date"
                  placeholder="Birth of Student Tutor"
                  name="birth"
                  {...register("birth")}
                />
                <small>{getErrors("birth")}</small>
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
                <label>Phone of Students</label>
                <input
                  type="number"
                  placeholder="Phone of Students"
                  name="phone"
                  {...register("phone")}
                />
                <small>{getErrors("phone")}</small>
              </div>
              <div className="wrap-input">
                <label>IC Number</label>
                <input
                  type="number"
                  placeholder="IC Number"
                  name="nationalNumberId"
                  {...register("nationalNumberId")}
                />
                <small>{getErrors("nationalNumberId")}</small>
              </div>
              <div className="wrap-input">
                <label>Class Register</label>
                <input
                  type="text"
                  placeholder="Class Register"
                  name="classRegister"
                  {...register("classRegister")}
                />
                <small>{getErrors("classRegister")}</small>
              </div>
              <div className="wrap-input">
                <label>Payment dues</label>
                <input
                  type="number"
                  placeholder="Payment dues"
                  name="paymentDues"
                  {...register("paymentDues")}
                />
                <small>{getErrors("paymentDues")}</small>
              </div>
              <button type="submit">
                Add
                {LOAD&&<LoadSpinner size={"30px"} />}
              </button>
            </Form>
            <button onClick={() => onClose(!isOpen)}>Cancel</button>
          </WrapperForm>
        </FormContainer>
      </WrapperModal>
    </Modal>
  );
}
