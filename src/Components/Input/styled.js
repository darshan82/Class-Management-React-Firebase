import styled from "styled-components";
import themes from "../../themes/themes.json";

export const InputComponent = styled.div`
  width: ${({ width }) => (width ? width : "100%")};
  
  input {
    width: ${({ width }) => (width ? width : "100%")};
    background-color: ${themes.bg};

    border: solid 1px ${themes.border};
    border-radius: 5px;

    padding: 16px 10px;

    :focus {
      outline: 0;
      box-shadow: 0 0 8px 2.5px ${themes["primary-color"]};
    }
  }
`;
