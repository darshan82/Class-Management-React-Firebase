import React, { useEffect } from "react";
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
const manageExpenseSchema = yup
  .object({
    type: yup.string().required(),
    expense: yup.number().required().moreThan(0),
    dateExpense: yup.date().required(),
  })
  .required();

export function ModalEditExpense({ content,isOpen, onClose, onEdit ,...rest}) {
  // Hooks
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(manageExpenseSchema),
  });
  const getErrors = (field) =>
    errors[field] && errors[field].message.replace(field, "");

  // Effects
  useEffect(()=>{
    setValue('type',content.type)
    setValue('expense',content.expense)
    setValue('dateExpense',new Date(content.dateExpense.split("T")[0]))
  },[])

  // handle functions
  function onSubmit(dataForm) {
    onEdit({...dataForm});
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
            <h1>Edit Expense</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="wrap-input">
                <label>Expense</label>
                <input
                  type="text"
                  placeholder="Expense"
                  name="expense"
                  {...register("expense")}
                />
                <small>{getErrors("expense")}</small>
              </div>
              <div className="wrap-input">
                <label>Type of expense</label>
                <select
                  placeholder="Type"
                  name="type"
                  {...register("type")}
                >
                  <option value="Bills">Bills</option>
                  <option value="Tolls">Tolls</option>
                  <option value="Tutor fees">Tutor fees</option>
                </select>
                <small>{getErrors("type")}</small>
              </div>
              <div className="wrap-input">
                <label>Date expense</label>
                <input
                  type="date"
                  name="dateExpense"
                  {...register("dateExpense")}
                />
                <small>{getErrors("dateExpense")}</small>
              </div>
              <button type="submit">Edit</button>
            </Form>
            <button onClick={() => onClose(!isOpen)}>Cancel</button>
          </WrapperForm>
        </FormContainer>
      </WrapperModal>
    </Modal>
  );
}
