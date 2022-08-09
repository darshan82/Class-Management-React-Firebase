import styled from 'styled-components';
import themes from "../../themes/themes.json";


export const EarningNotifyContainer = styled.div`
  width: 260px;
  height: 210px;
  background:${themes.bg} ;
  box-shadow: ${themes.shadow};
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .icon{
    width: 40%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .wrap-icon{
      padding: 20px;
      background: ${themes['dark-bg']};
      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img{
        width: 40px;
        height: 40px;
      }
    }
  }
  .content{
    width: 60%;
    height: 100%;

    /* background: red; */

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    /* padding: 20px; */

    h2{
      color: #ccc;
    }
    h1{
      font-size: 1.6rem;
      color: ${themes.color};
      word-break: keep-all;
    }
  }
`;
