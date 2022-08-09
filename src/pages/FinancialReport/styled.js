import styled from "styled-components";
import themes from "../../themes/themes.json";

export const FinancialReportContainer = styled.div`
  background-color: ${themes["dark-bg"]};
  width: 100%;
  min-height: 100%;
  height: min-content;

  padding: 30px 50px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;

  @media screen and (max-width: 1360px) {
    flex-direction: column-reverse;
  }
`;
export const Col = styled.div`
  width: min-content;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;

  @media screen and (max-width: 1360px) {
    /* background:${({ toRow }) => (toRow ? "red" : "")} ; */
    width: ${({ toRow }) => (toRow ? "800px" : "")};
    flex-direction: ${({ toRow }) => (toRow ? "row" : "")};
    /* justify-content:${({ toRow }) => (toRow ? "flex-start" : "")} ; */
  }
`;
