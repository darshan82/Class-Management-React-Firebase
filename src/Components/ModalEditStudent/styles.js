import styled from 'styled-components';
import themes from '../../themes/themes.json'

export const WrapperModal = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const DisplayContainer = styled.div`
  /* background: #009; */
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img{
    width: 75%;
    height: 75%;
  }
`;

export const FormContainer = styled.div`
  /* background: #009; */
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const WrapperForm = styled.div`
  /* background: #009; */
  width: 80%;
  height: min-content;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;

  small{
    color: red;
  }

  h1{
    font-weight: 400;
    color: ${themes.color};
  }
  button{
    background: ${themes['dark-second-color']};
    border: none;
    width: 100%;
    padding: 15px ;
    font-size: 1.2rem;
    border-radius: 6px;
    color: ${themes.bg};
    cursor: pointer;
  }
`
export const Form = styled.form`
  /* background-color: #009; */
  width: 100%;
  height: min-content;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 15px;

  .wrap-input{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;

    input,select{
      background: ${themes.bg};
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      border: solid 1px ${themes['primary-color']};
    }
    option{
      font-size: 1.2rem;
      line-height: 40px;
    }
  }

  button{
    background: ${themes['dark-primary-color']};
    border: none;
    width: 100%;
    padding: 15px ;
    font-size: 1.2rem;
    border-radius: 6px;
    color: ${themes.bg};
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 30px;
  }
`