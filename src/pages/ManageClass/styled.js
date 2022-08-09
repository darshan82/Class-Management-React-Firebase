import styled from 'styled-components';
import themes from '../../themes/themes.json'

export const ManageClassContainer = styled.div`
  background-color: ${themes['dark-bg']};
  width: 100%;
  min-height: min-content;
  height: 100%;

`;
export const HeaderPage = styled.div`
  /* background-color: #009; */
  width: 100%;
  min-height: 100px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  input{
    width: 50%;
    background: ${themes['bg']};
    border: none;
    border-radius: 25px;
    padding: 15px 20px;
    font-size: 1.2rem;
    :focus{
      background: ${themes.bg};
      outline: 0;
      box-shadow: ${themes.shadow};
    }
  }

  button{
    background: ${themes['dark-primary-color']};
    color: ${themes.bg};
    position: absolute;
    right: 40px;
    padding: 10px 20px;

    border-radius: 25px;
    border: none;

    font-size: 1.1rem;

    :hover{
      box-shadow: ${themes.shadow};
      cursor: pointer;
    }
  }

`
export const MainContent = styled.div`
  width: 100%;
  height: calc(100% - 75px);

  padding: 20px;

  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`