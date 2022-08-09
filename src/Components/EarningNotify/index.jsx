import React, { useContext, useEffect, useState } from "react";
import { EarningNotifyContainer } from "./styled.js";
//
import EarningIcon from "../../images/earning/earning-icon.svg";
import { db } from "../../database/index.js";
import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
import moment from "moment";

export default function EarningNotify() {
  const {userGoogle} = useContext(AuthContext)
  // States
  const [AMOUNT,SET_AMOUNT] = useState(0)
  let currency = "RM"

  useEffect(()=>{
    if(userGoogle?.id){
      db
        .collection("finances")
        .doc(userGoogle?.id)
        .collection("earning")
        .where('ref','==',userGoogle?.id)
        .onSnapshot(snap=>{
          let filter = snap.docs.filter(x=>{
            let data = x.data()
            let date = data.dateEarning.toDate()
            let isSameYear = moment().isSame(date,'year')
            return isSameYear
          })
          let reduce = filter.reduce((acc,x)=> acc + x.data().earning ,0)
          SET_AMOUNT(reduce.toFixed(2));
        })
    }
  },[userGoogle])


  return (
    <EarningNotifyContainer>
      <div className="icon">
        <div className="wrap-icon">
          <img src={EarningIcon}  alt='icon' />
        </div>
      </div>
      <div className="content">
        <h2>Earning</h2>
        <h1>{`${currency}${AMOUNT}`}</h1>
      </div>
    </EarningNotifyContainer>
  );
}
