import styled from 'styled-components';
import themes from '../../../themes/themes.json'

export const CardCalenderNotifyContainer = styled.div`
  width: 100%;
  min-height: 80px;

  /* background: #099; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .marker{
    width: 8px;
    height: 100%;
    border-radius: ${themes['border-radius']};
    background:${themes['dark-primary-color']} ;
  }
  .content-card{
    width: calc(100% - 8px);
    height: 100%;
    /* background: #009; */

    padding: 10px 20px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;

    h1{
      font-weight: 450;
      font-size: 1.3rem;
    }
    span{
      color: #555;
    }
  }
`;
