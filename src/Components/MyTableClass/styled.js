import styled from "styled-components";
import themes from "../../themes/themes.json";

export const MyTableContainer = styled.div`
  /* background-color: #009; */
  width: ${(width) => (width ? width : "100%")};
  min-width: ${(minWidth) => (minWidth ? minWidth : "100%")};
  height: ${(height) => (height ? height : "100%")};

  border-radius: 6px;
  box-shadow: ${themes.shadow};
`;

export const ActionsButtonContainer = styled.div`
  /* background: #009; */
  width: min-content;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;

  .wrap-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: relative;
    cursor: pointer;
    .edit-hover {
      position: absolute;
      left: 30px;
      padding: 5px 10px;
      border-radius: 12px;
      box-shadow: ${themes.shadow};
      opacity: 0;
      visibility: hidden;
    }
    .delete-hover {
      position: absolute;
      right: 30px;
      padding: 5px 10px;
      border-radius: 12px;
      box-shadow: ${themes.shadow};
      opacity: 0;
      visibility: hidden;
    }
    &.del {
      :hover {
        .delete-hover {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.5s ease;
        }
      }
    }
    &.edit {
      :hover {
        .edit-hover {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.5s ease;
        }
      }
    }
    svg {
      fill: ${themes["dark-primary-color"]};
      width: 25px;
      height: 25px;
    }
  }
`;

export const NameClassesContainer = styled.div`
  h1 {
    font-size: 1.1rem;
  }
  p {
    color: #aaa;
  }
`;

export const Availability = styled.span`
  &.available{
    color: green;
    font-weight: 600;
  }
  &.full{
    color: red;
    font-weight: 600;
  }
`
export const TutorName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  p{
    font-size: 1.1rem;
    font-weight: 600;
  }
  span{
    color: #bbb;
    font-weight: 400;
    font-size: 1rem;
  }
`