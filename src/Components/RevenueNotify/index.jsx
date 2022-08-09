//
import "chart.js/auto";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { AuthContext } from "../../Contexts/AuthContext";
import { db } from "../../database/index.js";
//
import { RevenueContainer } from "./styled.jsx";

export function RevenueNotify({ ...rest }) {
  // Context
  const { userGoogle } = useContext(AuthContext);
  // States
  const [EARNING, SET_EARNING] = useState([]);
  const [TOTAL_EARNING, SET_TOTAL_EARNING] = useState(0);
  //
  const [EXPENSE, SET_EXPENSE] = useState([]);
  const [TOTAL_EXPENSE, SET_TOTAL_EXPENSE] = useState(0);
  const [DATE_EARNING, SET_DATE_EARNING] = useState([]);

  // Effects
  useEffect(() => {
    getEarnings();
    getExpense();
  }, []);

  // Callbacks
  const getEarnings = useCallback(() => {
    const lastEarning = db
      .collection("finances")
      .doc(userGoogle.id)
      .collection("earning")
      .where("ref", "==", userGoogle.id)
      .orderBy("dateEarning", "asc")
      .onSnapshot((snap) => {
        let filter = snap.docs.filter((x) => {
          let data = x.data();
          let dateMonth = moment(data.dateEarning.toDate()).format();
          let thisMonth = moment(new Date()).format();
          return moment(thisMonth).isSame(dateMonth, "year");
        });
        let data = filter.map((x) => {
          let d = x.data();
          let date = moment(d.dateEarning.toDate()).format().split("T")[0];
          d.dateEarning = new Date(date);
          return d;
        });
        //
        let months = reducerMonth(data, "dateEarning");
        let earns = reducerCountByMonth(data, "dateEarning", "earning");
        let purifyMonths = months.map((x) =>
          moment(new Date().setMonth(x)).format("MMM")
        );
        let purifyEarn = Object.entries(earns).map(([k, x]) => x);
        let total = purifyEarn.reduce((acc, x) => acc + x, 0);
        SET_TOTAL_EARNING(total);
        SET_EARNING(purifyEarn);
        SET_DATE_EARNING(purifyMonths);
      });
    return () => lastEarning;
  }, [userGoogle, EARNING, DATE_EARNING]);

  // Expense

  const getExpense = useCallback(() => {
    const lastEarning = db
      .collection("finances")
      .doc(userGoogle.id)
      .collection("expense")
      .where("ref", "==", userGoogle.id)
      .orderBy("dateExpense", "asc")
      .onSnapshot((snap) => {
        let filter = snap.docs.filter((x) => {
          let data = x.data();
          let dateMonth = moment(data.dateExpense.toDate()).format();
          let thisMonth = moment(new Date()).format();
          return moment(thisMonth).isSame(dateMonth, "year");
        });
        let data = filter.map((x) => {
          let d = x.data();
          let date = moment(d.dateExpense.toDate()).format().split("T")[0];
          d.dateExpense = new Date(date);
          return d;
        });
        //
        let expense = reducerCountByMonth(data, "dateExpense", "expense");
        let purifyExpense = Object.entries(expense).map(([k, x]) => x);
        let total = purifyExpense.reduce((acc, x) => acc + x, 0);
        SET_TOTAL_EXPENSE(total);
        SET_EXPENSE(purifyExpense);
      });
    return () => lastEarning;
  }, [userGoogle, EXPENSE]);

  // handle Functions
  function reducerMonth(arrObj, keyDate) {
    let months = [];
    arrObj.forEach((x) => {
      let currentMonth = x[keyDate].getMonth();
      for (let i = 0; i <= 11; i++) {
        if (currentMonth == i && !months.includes(i)) {
          months.push(currentMonth);
        }
      }
    });
    // tratar depois
    return months;
  }
  function reducerCountByMonth(arrObj, keyDate, keyCount) {
    let earning = {};
    arrObj.forEach((x) => {
      let currentMonth = x[keyDate].getMonth();
      let gain = x[keyCount];
      for (let i = 0; i <= 11; i++) {
        if (currentMonth == i) {
          earning[i] = !earning[i] ? gain : gain + earning[i];
        } else {
          if (!earning[i]) {
            earning[i] = 0;
          }
        }
      }
    });
    return earning;
  }

  return (
    <RevenueContainer>
      <div className="wrap-header">
        <h2>Revenue</h2>
        <div className="total-earning">
          <div className="earning">
            <h2>{`RM ${TOTAL_EARNING.toFixed(2)}`}</h2>
            <span>Total earning so far</span>
          </div>
          <div className="expense">
            <h2>{`RM ${TOTAL_EXPENSE.toFixed(2)}`}</h2>
            <span>Total expense so far</span>
          </div>
        </div>
      </div>
      <div className="wrap-chart">
        <Chart
          type="line"
          data={{
            labels: DATE_EARNING,
            datasets: [
              {
                id: 0,
                label: "Earning",
                data: [...EARNING],
                backgroundColor: ["#63AAE6"],
              },
              {
                id: 0,
                label: "Expenses",
                data: [...EXPENSE],
                backgroundColor: ["#e66363"],
              },
            ],
          }}
          // primaryAxis,
          // secondaryAxes,
        />
      </div>
    </RevenueContainer>
  );
}
