import React from "react";
import { AddEarning } from "../../Components/AddEarning";
import { AddExpense } from "../../Components/AddExpense";
import { RevenueNotify } from "../../Components/RevenueNotify";
import { TransactionsNotify } from "../../Components/TransactionsNotify";
//
import { Col, FinancialReportContainer } from "./styled.js";

export function FinancialReport() {
  return (
    <FinancialReportContainer>
      <Col>
        <RevenueNotify />
        <TransactionsNotify />
      </Col>
      <Col toRow={true}>
        <AddEarning />
        <AddExpense />
      </Col>
    </FinancialReportContainer>
  );
}
