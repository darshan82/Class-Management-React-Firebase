import styled from "styled-components";
import themes from "../../themes/themes.json";

export const AddEarningContainer = styled.div`
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
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  h1 {
    font-size: 1.8rem;
    font-weight: 400;
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

  padding: 0 30px;
`;
export const MainContent = styled.div`
  /* background: #099; */
  width: 100%;
  height: calc(100% - 80px);

  ul{
    /* background: #900; */
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;

    li{
      /* background: #090; */
      padding: 2px 10px;

      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;
      gap: 5px;

      span{
        font-size: 1.5rem;
        :not(.earn){
          color: #bbb;
          font-weight: 600;
        }
      }

      .earn{
        font-weight: 400;
      }
    }
  }
`
