import styled from 'styled-components';
import themes from '../../themes/themes.json'


export const TransactionsNotifyContainer = styled.div`
  background: ${themes.bg};
  box-shadow: ${themes.shadow};
  border-radius: 25px;

  width: 800px;
  height: 450px;
`;
export const MainContent = styled.div`
  width: 100%;
  height: 500px;
  padding: 15px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`
export const Header = styled.div` 
  /* background: #099; */
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 0 20px;

  input{
    width: 300px;
    background: ${themes['dark-bg']};
    padding: 10px;
    border:none;
    border-radius: 12px;
  }
` 