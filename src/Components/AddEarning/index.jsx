import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
//
import { FaFolderPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext";
import { db } from "../../database";
import { ModalAddEarning } from "../ModalAddEarning/index.jsx";
//
import { AddEarningContainer, Header, MainContent } from "./styled.js";

export function AddEarning() {
  const { userGoogle } = useContext(AuthContext);
  const [OPEN_EARN_MODAL, SET_OPEN_EARN_MODAL] = useState(false);
  const [LAST_EARNING, SET_LAST_EARNING] = useState([]);

  // Effects
  useEffect(() => {
    db.collection("finances")
      .doc(userGoogle.id)
      .collection("earning")
      .where("ref", "==", userGoogle.id)
      .orderBy("dateEarning", "desc")
      .onSnapshot((snap) => {
        let filter = snap.docs.filter((x) => {
          let data = x.data();
          let dateMonth = moment(data.dateEarning.toDate()).format();
          let thisMonth = moment(new Date()).format();
          return moment(thisMonth).isSame(dateMonth, "year");
        });
        let data = filter.map((x) => {
          let date = x.data().dateEarning.toDate();
          let d = x.data();
          let id = x.id;
          d.dateEarning = date;
          return {
            ...d,
            id,
          };
        });
        SET_LAST_EARNING([...data.slice(0, 6)]);
      });
  }, [userGoogle]);

  // Handle Function
  function onAdd(data) {
    data.ref = userGoogle.id;
    db.collection("finances")
      .doc(userGoogle.id)
      .collection("earning")
      .add(data)
      .then((x) => toast.success("Earning added succefully!"))
      .catch((err) => toast.error(err));
  }

  return (
    <>
      <AddEarningContainer>
        <Header>
          <h1>Last Earnings</h1>
          <button onClick={() => SET_OPEN_EARN_MODAL(!OPEN_EARN_MODAL)}>
            <FaFolderPlus />
            Add
          </button>
        </Header>
        <MainContent>
          <ul>
            {LAST_EARNING.map((x, i) => {
              let date = moment(x.dateEarning)
                .format("")
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/");
              let earning = x.earning;
              return (
                <li key={i}>
                  <span>{date}</span>
                  <span className="earn">{`RM ${earning.toFixed(2)}`}</span>
                </li>
              );
            })}
          </ul>
        </MainContent>
      </AddEarningContainer>
      {OPEN_EARN_MODAL && (
        <ModalAddEarning
          isOpen={OPEN_EARN_MODAL}
          onClose={() => SET_OPEN_EARN_MODAL(!OPEN_EARN_MODAL)}
          onAdd={onAdd}
        />
      )}
    </>
  );
}
