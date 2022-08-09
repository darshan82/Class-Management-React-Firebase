import styled from "styled-components";
import themes from "../../themes/themes.json";

export const FeedbackNotifyContainer = styled.div`
  background-color: ${themes.bg};
  box-shadow: ${themes.shadow};
  min-width: 280px;
  height: 450px;

  border-radius: 25px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding: 25px 0 0 0;

  .main-content {
    /* background: #009; */
    width: 100%;
    height: 80%;

    padding: 0 10px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .empty-field {
      text-align: center;
      margin: auto;
      font-weight: 400;
      color: #ccc;
    }
  }
  .wrap-button {
    /* background: #090; */
    width: 100%;
    height: 20%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    a {
      background: ${themes["dark-primary-color"]};
      cursor: pointer;
      width: 60%;
      padding: 15px;
      font-size: 1rem;
      border: none;
      border-radius: 25px;
      color: ${themes.bg};
      :hover {
        transform: scale(1.05);
        box-shadow: ${themes.shadow};
        background: ${themes.bg};
        color: ${themes["dark-primary-color"]};
      }
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export const CardFeedbackContainer = styled.div`
  width: 100%;
  min-height: 85px;
  /* background: #00aa; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .wrap-img {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    svg {
      width: 45px;
      height: 45px;
      color: ${themes["dark-primary-color"]};
      /* background: red; */
      border-radius: 25px;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .wrap-content {
    width: 75%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;

    h1 {
      width: 100%;
      height: 50%;
      font-weight: 500;
      font-size: 1.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-direction: column;
    }
    p {
      width: 100%;
      height: 60%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;
