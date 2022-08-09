import styled from 'styled-components';
import themes from "../../themes/themes.json";

export const ButtonComponent = styled.button`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "min-content")};
  padding: ${({ padding }) => (padding ? padding : "12px")};

  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1rem")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "600")};

  color: ${({ color }) => (color ? color : "#111")};
  background: ${({ bg }) => (bg ? bg : `${themes["primary-color"]}`)};

  border: none;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  svg {
    width: 25px;
    height: 25px;
  }

  cursor: pointer;
  :hover {
    transform: scale(1.02);
    box-shadow: 0 0 12px 5px
      ${({ shadow }) => (shadow ? shadow : 'rgba(0,0,0,0.15)')};
  }
`;

