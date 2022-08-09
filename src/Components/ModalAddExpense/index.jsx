import React from "react";
import Modal from "react-modal";
//
import {
  DisplayContainer,
  Form,
  FormContainer,
  WrapperForm,
  WrapperModal,
} from "./styled.js";
// 
import display from "../../images/earning/expense.svg";
//
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// schema
const manageClassSchema = yup
  .object({
    expense: yup.number().moreThan(0).required(),
    type: yup.string().min(3).required(),
    dateExpense: yup.date().required(),
  })
  .required();

export function ModalAddExpense({ isOpen, onClose, onAdd }) {
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

  function onSubmit(dataForm) {
    onAdd({ ...dataForm });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <WrapperModal>
        <DisplayContainer>
          <img src={display} alt="teacher" />
        </DisplayContainer>
        <FormContainer>
          <WrapperForm>
            <h1>Add your Expense</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="wrap-input">
                <label>Expense</label>
                <input
                  type="number"
                  step={0.01}
                  placeholder="Expense"
                  name="expense"
                  {...register("expense")}
                />
                <small>{getErrors("expense")}</small>
              </div>

              <div className="wrap-input">
                <label>Type of Expense</label>
                <select
                  placeholder="Type of Expense"
                  name="type"
                  {...register("type")}
                >
                  <option value=""></option>
                  <option value="Bills">Bills</option>
                  <option value="Tutor fees">Tutor fees</option>
                  <option value="Tools">Tools</option>
                </select>
                <small>{getErrors("type")}</small>
              </div>

              <div className="wrap-input">
                <label>Date of Expense</label>
                <input
                  type="date"
                  placeholder="Date of Expense"
                  name="dateExpense"
                  {...register("dateExpense")}
                />
                <small>{getErrors("dateExpense")}</small>
              </div>
              <button type="submit">Add</button>
            </Form>
            <button onClick={() => onClose(!isOpen)}>Cancel</button>
          </WrapperForm>
        </FormContainer>
      </WrapperModal>
    </Modal>
  );
}
