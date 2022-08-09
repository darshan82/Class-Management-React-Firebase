import styled from "styled-components";
import themes from "../../themes/themes.json";

export const SubFolder = styled.div`
  background: ${themes.bg};
  box-shadow: ${themes.shadow};
  border-radius: 16px;
  width: 220px;
  height: min-content;
  position: absolute;
  z-index: 999;
  top: 15px;
  left: 75px;

  &.isOpen {
    position: relative;
    top: 0;
    left: 10px;

    display: block;
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    background: none;
  }
`;
export const LiSubFolder = styled.div`
  width: 100%;
  padding: 10px 18px;

  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;

  &.isOpen {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    .sub-folder {
      display: block;
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s ease;
    }
  }

  .sub-folder {
    /* display: none; */
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease;
  }
  :hover {
    .sub-folder {
      /* display: block; */
      z-index: 999;
      opacity: 1;
      visibility: visible;
      transition: opacity 0.5s ease;
    }
  }

  a {
    color: ${themes["dark-primary-color"]};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    svg {
      border-radius: 12px;
      width: 45px;
      height: 45px;
      padding: 10px;
      :hover {
        &.isOpen:not(.icon-sub-folder) {
          color: ${themes["dark-primary-color"]};
          background: ${themes["bg"]};
          box-shadow: 0 0 8px 2px ${themes["dark-primary-color"]};
        }
      }
    }
  }
`;

export const SideMenu = styled.div`
  /* background-color: ${themes["primary-color"]}; */
  min-width: 85px; // Open and close 85 => 200
  height: 100%;
  transition: all 0.5s ease;

  position: relative;
  left: 0;

  border-right: ${themes["line-size"]} solid ${themes["dark-primary-color"]};

  .head-menu {
    /* background: #990; */
    width: 100%;
    height: 75px;

    padding: 25px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    svg {
      width: 35px;
      height: 35px;
      color: ${themes["dark-primary-color"]};
      :hover {
        cursor: pointer;
      }
    }
  }

  .list-menu {
    /* background: #990; */
    width: 100%;
    min-height: calc(100% - 75px);

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;

      gap: 20px;

      .li-sub-folder {
        :hover {
          .sub-folder {
            display: block;
            opacity: 1;
            visibility: visible;
            transition: opacity 0.5s ease;
          }
        }
      }

      li {
        /* background: #900; */
        width: 100%;
        padding: 10px 18px;

        position: relative;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        gap: 10px;
        cursor: pointer;

        a {
          color: ${themes["dark-primary-color"]};
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .name-list {
          display: none;
          opacity: 0;
          visibility: hidden;
          transform: scale(0.1) translateX(0);
          transition: all 2s ease;
        }
        &.inRoute {
          a {
            color: ${themes["inRoute"]};
          }
        }

        svg {
          border-radius: 12px;
          width: 45px;
          height: 45px;
          padding: 10px;
          &:not(.icon-sub-folder) {
            :hover {
              color: ${themes["dark-primary-color"]};
              background: ${themes["bg"]};
              box-shadow: 0 0 8px 2px ${themes["dark-primary-color"]};
            }
          }
        }
        :hover {
          .name-list {
            transition: all 0.5s ease;
            display: block;
            opacity: 1;
            visibility: visible;
            z-index: 99;
            position: absolute;
            left: 80px;
            transform: translateX(5px);
            padding: 5px 10px;
            background: ${themes.bg};
            box-shadow: 0 0 8px 2px ${themes["dark-primary-color"]};
            border-radius: 12px;
          }
        }
      }
    }
  }

  &.isOpen {
    transition: all 0.5s ease;
    min-width: 200px;

    .list-menu {
      ul {
        li {
          .name-list {
            transition: all 0.5s ease;
            display: block;
            opacity: 1;
            visibility: visible;
            transform: scale(1);
          }
          svg {
            width: 45px;
            height: 45px;
            padding: 10px;
            :hover {
              color: ${themes["dark-primary-color"]};
              background: none;
              box-shadow: none;
            }
          }

          :hover {
            .name-list {
              transition: all 0.5s ease;
              display: block;
              opacity: 1;
              position: absolute;
              left: 65px;
              transform: translate(0px);
              padding: 0;
              background: ${themes.bg};
              box-shadow: none;
            }
          }
        }
      }
    }
  }
`;
