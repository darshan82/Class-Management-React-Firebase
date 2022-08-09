import styled from 'styled-components';
import themes from "../../themes/themes.json";


export const AddExpenseContainer = styled.div`
  background: ${themes.bg};
  box-shadow: ${themes.shadow};
  border-radius: 25px;

  width: 340px;
  height: 450px;
`;
export const Header = styled.div`
  /* background: #009; */
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;

  div {
    h1{
      font-size: 1.8rem;
      font-weight: 400;
    }
    span{
      color: #aaa;
    }
  }
  button {
    padding: 10px 15px;
    border-radius: 12px;
    border: none;
    background: ${themes["dark-primary-color"]};
    color: ${themes.bg};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 5px;
    cursor: pointer;

    font-size: 1.1rem;
    :hover {
      box-shadow: ${themes.shadow};
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`
export const MainContent = styled.div`
  width: 100%;
  height: calc(100% - 80px);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`