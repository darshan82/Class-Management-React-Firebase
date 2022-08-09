import "chart.js/auto";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
import { db } from "../../database/index.js";
import { StudentsPerformaceNotifyContainer } from "./styled.js";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export function StudentsPerformaceNotify() {
  // Context
  const { userGoogle } = useContext(AuthContext);
  // Hooks

  // States
  const [COUNT_STUDENTS, SET_COUNT_STUDENTS] = useState([]);
  const [MONTHS, SET_MONTHS] = useState([]);

  // Effects
  useEffect(() => {
    if (userGoogle?.id) {
      db.collection("students")
        .doc(userGoogle?.id)
        .collection("student")
        .where("ref", "==", userGoogle?.id)
        .onSnapshot((snap) => {
          let filter = snap.docs.filter((x) => {
            let data = x.data();
            let date = data.createdAt.toDate();
            let isSameYear = moment().isSame(date, "year");
            return isSameYear;
          });
          let data = reduceByMonths(filter);
          let months = Object.entries(data).map(([k, x]) =>
            moment(new Date().setMonth(k)).format("MMM")
          );
          let counts = Object.entries(data).map(([k, x]) => x);
          SET_MONTHS(months);
          SET_COUNT_STUDENTS(counts);
        });
    }
  }, [userGoogle]);

  // Functions
  function reduceByMonths(arrObj) {
    let obj = {};
    arrObj.forEach((x) => {
      let data = x.data();
      let date = data.createdAt.toDate();
      let currentMonth = date.getMonth();
      for (let i = 0; i <= 11; i++) {
        if (currentMonth == i) {
          obj[i] = !obj[i] ? 1 : obj[i] + 1;
        } else {
          if (!obj[i]) {
            obj[i] = 0;
          }
        }
      }
    });
    return obj;
  }

  return (
    <StudentsPerformaceNotifyContainer>
      <span>Students Performace</span>
      <div className="wrap-chart">
        <Bar
          style={{ width: "94%" }}
          options={options}
          data={{
            labels: MONTHS,
            datasets: [
              {
                label: "Performace by ammount class",
                data: COUNT_STUDENTS,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </div>
    </StudentsPerformaceNotifyContainer>
  );
}
