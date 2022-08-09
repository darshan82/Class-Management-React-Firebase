import styled from "styled-components";
import themes from "../../themes/themes.json";

export const Cards = styled.div`
  background: ${themes.bg};
  min-width: 275px;
  height: 130px;

  border-radius: ${themes['border-radius']};

  box-shadow:${themes.shadow};

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;

  .wrap-icon {
    /* background: #009; */
    width: 120px;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    padding: 15px 0;

    .icon {
      background: ${themes.gradient};
      width: 80px;
      height: 80px;

      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        /* background-color: #990; */
        width: 35px;
        height: 35px;
      }
    }
  }

  .wrap-content {
    /* background: #009; */
    width: calc(100% - 120px);
    height: 100%;

    padding: 20px 0;

    position: relative;

    h1 {
      font-size: 1.4rem;
      font-weight: 500;
      color: #a3aed0;
    }
    span {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
    }

    .graph {
      width: 70px;
      height: auto;
      position: absolute;
      right: 15px;
      bottom: 15px;
    }
  }
`;
