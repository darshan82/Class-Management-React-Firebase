import React from "react";
import { cards_dashboard } from "../../Fake-database/index.js";
import Calender from "../Calender/index.jsx";
import CalenderNotify from "../CalenderNotify/index.jsx";
import CardInfo from "../CardsInfo/index.jsx";
import EarningNotify from "../EarningNotify/index.jsx";
import { FeedbackNotify } from "../FeedbackNotify";
import { StudentsPerformaceNotify } from "../StudentsPerformaceNotify/index.jsx";
import TutorFeesNotify from "../TutorFeesNotify/index.jsx";
import { Col, InitialDashboardContainer, Row } from "./styled.js";

export default function InitialDashboard() {
  return (
    <InitialDashboardContainer>
      <div className="head-main">
        {cards_dashboard.map((x, i) => (
          <CardInfo key={i} x={x} />
        ))}
      </div>
      <div className="content-main">
        <Row>
          <Calender />
          <CalenderNotify />
        </Row>
        <Row>
          <FeedbackNotify />
          <Col>
            <EarningNotify />
            <TutorFeesNotify />
          </Col>
          <StudentsPerformaceNotify />
        </Row>
      </div>
    </InitialDashboardContainer>
  );
}
