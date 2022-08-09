import styled from "styled-components";
import themes from "../../themes/themes.json";

export const InitialDashboardContainer = styled.div`
  background-color: ${themes["dark-bg"]};
  width: 100%;
  min-height: calc(100vh - 80px);
  height: min-content;

  padding: 10px;

  .head-main {
    /* background: #900; */
    width: 100%;
    height: min-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px 40px;
    gap: 20px;

    overflow-x: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: 1360px) {
      justify-content: flex-start;
      ::-webkit-scrollbar {
        display: block;
        height: 4px;
      }
      ::-webkit-scrollbar-thumb {
        width: 20px;
      }
    }
  }

  .content-main {
    /* background: #009; */
    width: 100%;
    height: min-content;

    padding: 10px 40px;

    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 30px;

    @media screen and (max-width: 1316px) {
      justify-content: flex-start;
    }
  }
`;

export const Row = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  /* flex-wrap: wrap; */
  gap: 30px;

  padding: 0;
`;

export const Col = styled.div`
  width: min-content;
  height: min-content;

  display: flex;
  gap: 30px;
  flex-direction: column;
`;
