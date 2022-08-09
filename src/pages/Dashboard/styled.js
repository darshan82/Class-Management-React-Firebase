import styled from "styled-components";
import themes from "../../themes/themes.json";

export const DashboarContainer = styled.div`
  background-color: ${themes.bg};
  width: 100%;
  height: 100vh;
  position: relative;

  transition: all 0.5s ease;

  /* box-shadow:inset 0px 0px 20px 5px rgba(0,0,0,0.20); */

  /* overflow-x: scroll; */

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;
export const SideContent = styled.div`
  /* background-color: #009; */
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  overflow-x: hidden;

`;

export const MainContent = styled.main`
  background-color: ${themes["dark-bg"]};
  width: calc(100%);
  height: calc(100vh - 75px);

  overflow-y:scroll ;


`;

