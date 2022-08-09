import styled from 'styled-components';
import themes from "../../themes/themes.json";

export const TutorFeesNotifyContainer = styled.div`
  width: 260px;
  height: 210px;
  background:${themes.bg} ;
  box-shadow: ${themes.shadow};
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .content{
    width: 60%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    padding: 14px;

    h2{
      color: #ccc;
    }
    h1{
      color: ${themes.color};
      font-size: 1.5rem;
    }
  }
  .icon{
    width: 40%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .wrap-icon{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      padding: 5px;

      img{
        width: 85px;
        height: 85px;
      }
    }
  }
`;
