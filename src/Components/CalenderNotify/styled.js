import styled from "styled-components";
import themes from "../../themes/themes.json";

export const CalenderNotifyContainer = styled.div`
  background-color: ${themes["bg"]};
  width: calc(100% - 750px);
  min-width: 400px;
  max-width: 100%;
  height: 450px;

  border-radius: ${themes["border-radius"]};

  box-shadow: ${themes.shadow};

  position: relative;

  .shade {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0),
      ${themes.bg},
      ${themes.bg}
    );
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 30px;
  }

  .head-c_notify {
    width: 100%;
    height: 80px;
    /* background: #099; */

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    padding: 0 20px;

    h1 {
      font-weight: 400;
    }
  }

  .content-c_notify {
    /* background: #009; */
    width: 100%;
    height: calc(100% - 120px);

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    gap: 10px;

    overflow-y: scroll;

    padding: 0 20px 45px 20px;

    .empty-field {
      text-align: center;
      margin: auto;
      font-weight: 400;
      color: #ccc;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .view-all {
    /* background: #009; */
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;

    padding: 10px 25px;

    a {
      font-size: 1.2rem;
      font-weight: 400;
      cursor: pointer;
    }
  }
`;
