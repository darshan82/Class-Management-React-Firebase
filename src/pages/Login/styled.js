import styled from "styled-components";
import themes from "../../themes/themes.json";

export const LoginPageContainer = styled.div`
  background-color: ${themes.bg};
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ImageApresatation = styled.div`
  background-color: ${themes["primary-color"]};
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 70%;
    height: 70%;
  }

  @media screen and (max-width: 1024px) {
    width: 30%;
  }
`;

export const ContainerForm = styled.div`
  background-color: ${themes.bg};
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  overflow-y: scroll;

  @media screen and (max-width: 1024px) {
    width: 70%;
  }
`;

export const WrapperForm = styled.div`
  /* background: #900; */
  width: ${({ width }) => width};
  height: min-content;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;

  .header-form {
    width: 100%;
    p,
    h1 {
      text-align: start;
      color: ${themes.color};
    }

    h1 {
      font-weight: 500;
      font-size: 1.8rem;
    }
  }
  .create-account{
    width: 100%;
    p{
      text-align: center;
      font-size: 1.1rem;
      a{
        color: ${themes["dark-primary-color"]};
      }
    }
  }
`;
export const Form = styled.form`
  /* background-color: #009; */
  width: 100%;
  height: 100%;

  /* margin-top: 20px; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;


  .sub-options {
    /* background: #909; */
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .wrap-checkbox {
      /* background: #900; */
      width: 60%;
      
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      gap: 10px;
      label{
        width: 100%;
      }
    }
    a {
      color: ${themes["dark-primary-color"]};
    }
  }
  .wrap-buttons {
    margin-top: 10px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    label {
      text-align: center;
      color: ${themes.color};
      margin: 0;
      padding: 0;
    }
  }
`;
export const WrapInput = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  small{
    color: red;
  }

  label {
    width: 100%;
    color: ${themes.color};
  }
  input {
    width: ${({ width }) => (width ? width : "100%")};
    background-color: ${themes.bg};

    border: solid 1px ${themes.border};
    border-radius: 5px;

    padding: 16px 10px;

    :focus {
      outline: 0;
      box-shadow: 0 0 8px 2.5px ${themes["primary-color"]};
    }
  }
`

export const CheckBox = styled.input`
  background-color: ${themes.bg};

  border: solid 1px ${themes.border};
  border-radius: 100%;

  padding: 16px 10px;
  width: ${({ width }) => width};

  :focus {
    outline: 0;
    box-shadow: 0 0 8px 2.5px ${themes["primary-color"]};
  }
`;
