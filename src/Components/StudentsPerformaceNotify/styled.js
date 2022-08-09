import styled from "styled-components";
import themes from "../../themes/themes.json";

export const StudentsPerformaceNotifyContainer = styled.div`
  min-width: 570px;
  max-width: 750px;
  width: 100%;
  height: 450px;
  border-radius: 25px;
  background: ${themes.bg};
  box-shadow: ${themes.shadow};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;

  .wrap-chart {
    width: 95%;
    height: min-content;
  }

  span {
    width: 100%;
    color: ${themes.color};
    text-align: left;

    padding: 5px 40px;

    font-size: 1.4rem;
  }
`;
