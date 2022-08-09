import styled from "styled-components";
import themes from "../../themes/themes.json";

export const RevenueContainer = styled.div`
  background: ${themes.bg};
  box-shadow: ${themes.shadow};
  border-radius: 25px;

  width: 800px;
  height: 450px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  .wrap-header {
    width: 85%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-direction: row;
    h2 {
      width: min-content;
      height: 100%;
      font-size: 1.4rem;
      font-weight: 400;
    }
    .total-earning {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      gap: 20px;
      h2 {
        width: 120px;
      }
      span {
        color: #bbb;
      }
    }
  }

  .wrap-chart {
    width: 85%;
    height: 80%;
  }
`;
