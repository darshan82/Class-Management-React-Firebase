import React, { useContext, useEffect, useState } from "react";
import { TutorFeesNotifyContainer } from "./styled.js";
import Bars from "../../images/earning/bars.svg";
import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
import { db } from "../../database/index.js";
import moment from "moment";

export default function TutorFeesNotify() {
  const {userGoogle} = useContext(AuthContext)
  // States
  const [AMOUNT,SET_AMOUNT] = useState(0)

  let currency = "RM";
  let money = 565.5;

  useEffect(()=>{
    if(userGoogle?.id){
      db
        .collection("finances")
        .doc(userGoogle?.id)
        .collection("expense")
        .where('ref','==',userGoogle?.id)
        .onSnapshot(snap=>{
          let filter = snap.docs.filter(x=>{
            let data = x.data()
            let date = data.dateExpense.toDate()
            let isSameYear = moment().isSame(date,'year')
            let isTutor = data.type === "Tutor fees"
            return isSameYear && isTutor
          })
          let reduce = filter.reduce((acc,x)=> acc + x.data().expense ,0)
          SET_AMOUNT(reduce.toFixed(2));
        })
    }
  },[userGoogle])

  return (
    <TutorFeesNotifyContainer>
      <div className="content">
        <h2>Tutor fees</h2>
        <h1>{`${currency} ${AMOUNT}`}</h1>
      </div>
      <div className="icon">
        <div className="wrap-icon">
          <img src={Bars} alt="" />
        </div>
      </div>
    </TutorFeesNotifyContainer>
  );
}
