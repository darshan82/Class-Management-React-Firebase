import React, { useContext, useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
//
import { AddExpenseContainer, Header, MainContent } from "./styled";
//
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { ModalAddExpense } from "../ModalAddExpense";
import { db } from "../../database";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import moment from "moment";

export function AddExpense() {
  // Context
  const { userGoogle } = useContext(AuthContext);
  // Hooks
  // States
  const [OPEN_MODAL_EXPENSE, SET_OPEN_MODAL_EXPENSE] = useState(false);
  const [PIE_CHART, SET_PIE_CHART] = useState([]);
  const [PIE_CHART_LABELS, SET_PIE_CHART_LABELS] = useState([]);

  // Effects
  useEffect(() => {
    db.collection("finances")
      .doc(userGoogle.id)
      .collection("expense")
      .where("ref", "==", userGoogle.id)
      .onSnapshot((snap) => {
        const filter = snap.docs.filter((x) => {
          let dataDate = x.data().dateExpense.toDate();
          let thisDate = new Date();
          return moment(thisDate).isSame(dataDate, "year");
        });
        const data = filter.map((x) => {
          let d = x.data();
          let date = d.dateExpense.toDate();
          d.dateExpense = date;
          let id = x.id;
          return {
            ...d,
            id,
          };
        });
        let amount = ReducerExpensesByType(data);
        let countAmount = Object.entries(amount).map(([k, x]) => x);
        let namesAmount = Object.entries(amount).map(([k, x]) => k);
        SET_PIE_CHART_LABELS(namesAmount);
        SET_PIE_CHART(countAmount);
        // SET_PIE_CHART(amount);
      });
  }, [userGoogle]);

  // Handle Functions
  function ReducerExpensesByType(arrObj) {
    let obj = {};
    arrObj.forEach((x, i) => {
      obj[x.type] = !obj[x.type] ? x.expense : obj[x.type] + x.expense;
    });
    return obj;
  }

  function onAdd(data) {
    data.ref = userGoogle.id;
    db.collection("finances")
      .doc(userGoogle.id)
      .collection("expense")
      .add(data)
      .then(() => toast.success("Expense add succefully!"))
      .catch((err) => toast.error(err));
  }

  return (
    <>
      <AddExpenseContainer>
        <Header>
          <div>
            <h1>Expenses</h1>
            <span>this year</span>
          </div>
          <button onClick={() => SET_OPEN_MODAL_EXPENSE(!OPEN_MODAL_EXPENSE)}>
            <FaFolderPlus />
            Add
          </button>
        </Header>
        <MainContent>
          <Chart
            type="pie"
            data={{
              labels: PIE_CHART_LABELS,
              datasets: [
                {
                  id: 1,
                  label: "",
                  data: PIE_CHART,
                  backgroundColor: [
                    "#ADD7F6",
                    "#87BFFF",
                    "#3F8EFC",
                    "#2667FF",
                    "#3B28CC",
                  ],
                },
              ],
            }}
          />
        </MainContent>
      </AddExpenseContainer>
      {OPEN_MODAL_EXPENSE && (
        <ModalAddExpense
          isOpen={OPEN_MODAL_EXPENSE}
          onClose={() => SET_OPEN_MODAL_EXPENSE(!OPEN_MODAL_EXPENSE)}
          onAdd={onAdd}
        />
      )}
    </>
  );
}
