import { createGlobalStyle } from "styled-components";
import themes from '../themes/themes.json'

export const GlobalStyled = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: 'Roboto',sans-serif;
    box-sizing: border-box;
    scroll-behavior:smooth;
    ::-webkit-scrollbar{
      width: 8px;
      background: ${themes["primary-color"]};
    }
    ::-webkit-scrollbar-thumb{
      background: ${themes["dark-primary-color"]};
      border-radius: 25px;
    }
  }
  a{
    list-style: none;
    text-decoration: none;
    cursor: pointer;
  }
  li{
    list-style: none;
  }


`;
