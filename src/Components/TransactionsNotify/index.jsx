import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
// import { db } from "../../database/index.js";
import { MyTableTransaction } from "../MyTableTransaction/index.jsx";
//
import { Header, MainContent, TransactionsNotifyContainer } from "./styled.js";
// import { JsonToCsv, useJsonToCsv } from "react-json-csv";
// import moment from "moment";

// let dateNow = moment().format().split("T")[0];


export function TransactionsNotify() {
  //
  // const { saveAsCsv } = useJsonToCsv();
  //
  const [TYPE_HEAD, SET_TYPE_HEAD] = useState("");
  const [LIST_JSON, SET_LIST_JSON] = useState([]);

  // const filename = `expense-${dateNow}`,
  // fields = {
  //   type: "type",
  //   expense: "expense",
  //   dateExpense: "dateExpense",
  //   ref: "ref",
  //   id: "id",
  // },
  // style = {
  //   padding: "5px",
  // },
  // text = "Download CSV",
  // data=[...LIST_JSON];

  return (
    <TransactionsNotifyContainer>
      <Header>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => SET_TYPE_HEAD(e.target.value)}
        />
        {/* <JsonToCsv
          data={data}
          filename={filename}
          fields={fields}
          style={style}
          text={text}
        /> */}
        {/* <button onClick={saveAsCsv({ data, fields, filename })}>
          useJsonToCsv
        </button> */}
      </Header>
      <MainContent>
        <MyTableTransaction
          typeHead={TYPE_HEAD}
          JSON={(e) => SET_LIST_JSON(e)}
          style={{ zIndex: 0, position: "relative" }}
          // minWidth={"850px"}
          width={"100%"}
          height={"calc(400px - 60px)"}
        />
      </MainContent>
    </TransactionsNotifyContainer>
  );
}
