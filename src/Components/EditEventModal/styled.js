import styled from 'styled-components';
import themes from '../../themes/themes.json'

export const ContainerModal = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const WrapperImage = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img{
    width: 75%;
    height: auto;
  }
`
export const WrapperForm = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const Form = styled.form`
  /* background: #009; */
  width: 550px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  padding: 40px;

  h1{
    font-style: 1rem;
    font-weight: 400;
  }
  .wrap-input{
    label{
      font-size: 1.4rem;
      text-align: start;
    }
    .event-name{
      width: 100%;
      padding: 10px;
      border:solid 1px ${themes['border']};
      border-radius: 5px;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
  .wrap-input-date{
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    .wrap-date{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }
  }

  .wrap-buttons{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    button{
      padding: 10px;
      width: 100%;
      background: ${themes['dark-primary-color']};
      border:solid 1px ${themes['border']};
      border-radius: 5px;
      cursor: pointer;

      font-size: 1.1rem;
      color: ${themes.bg};
    }
  }
`;
