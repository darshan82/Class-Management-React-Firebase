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
import display from "../../images/earning/add-earning.svg";
//
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// schema
const manageClassSchema = yup
  .object({
    earning: yup.number().required(),
    dateEarning: yup.date().required(),
  })
  .required();

export function ModalAddEarning({ isOpen, onClose, onAdd }) {

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
            <h1>Add your earning</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="wrap-input">
                <label>Earning</label>
                <input
                  type="number"
                  step={0.01}
                  placeholder="Earning"
                  name="earning"
                  {...register("earning")}
                />
                <small>{getErrors("earning")}</small>
              </div>
              <div className="wrap-input">
                <label>Date of Earning</label>
                <input
                  type="date"
                  placeholder="Date of Earning"
                  name="dateEarning"
                  {...register("dateEarning")}
                />
                <small>{getErrors("dateEarning")}</small>
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
