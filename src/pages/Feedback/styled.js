import styled from "styled-components";
import themes from "../../themes/themes.json";

export const PaginationContainer = styled.div`
  width: 100%;
  height: 148px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff, #fff, #fff);

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const FeedbackPageContainer = styled.div`
  background-color: ${themes["dark-bg"]};
  width: 100%;
  min-height: calc(100vh - 80px);
  height: min-content;

  display: flex;
  flex-direction: column;
  position: relative;
`;

export const MainContent = styled.div`
  /* background: #900; */
  width: 100%;

  padding: 20px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  margin-bottom: 150px;

  .empty-field {
    color: #ccc;
    font-weight: 400;
    margin: auto;
  }
`;
export const CardMessagesContainer = styled.div`
  background: ${({ isRead }) => (isRead ? themes["bg"] : themes["gradient"])};
  box-shadow: ${themes.shadow};
  width: 100%;
  max-width: 1280px;
  /* height: min-content; */
  min-height: 180px;

  border-radius: 25px;

  padding: 20px 0;

  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: row;

  .img-container {
    width: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
    }
    svg {
      width: 80px;
      height: 80px;
      fill: ${themes["dark-primary-color"]};
    }
  }
  .feedback-container {
    width: calc(100% - 150px);
    max-width: 720px;
    height: 100%;
    /* height: 100%; */
    /* background: #900; */
    /* padding: 40px; */
    color: ${themes.color};

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 30px;

    .main-feedback {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;

      h2 {
        font-size: 1.4rem;
      }
      p {
        font-size: 1rem;
        font-weight: 400;
        line-height: 25px;
        .show-more {
          margin-left: 10px;
          padding: 2.5px 15px;
          background: #fff;
          border-radius: 25px;
          box-shadow: ${themes.shadow};
        }
      }
    }

    .timestamp {
      font-size: 1rem;
      color: #555;
    }
  }
  .options {
    min-width: 100px;
    height: 100%;
    /* background: #900; */
    padding: 10px 45px;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: row;
    gap: 30px;

    .mail {
      position: relative;
      svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      .descrip {
        background: ${themes.bg};
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.15);
        border-radius: 12px;
        position: absolute;
        width: 100px;
        right: 0;
        padding: 5px 8px;
        text-align: center;

        transition: opacity 0.8s ease;
        visibility: hidden;
        opacity: 0;
      }
      :hover {
        .descrip {
          transition: opacity 0.8s ease;
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
`;
