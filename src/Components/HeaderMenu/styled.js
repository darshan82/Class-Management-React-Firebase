import styled from 'styled-components';
import themes from '../../themes/themes.json'

export const HeaderMenuContainer = styled.div`
  /* background-color: #900; */
  width: 100%;
  height: 75px;

  border-bottom: ${themes["line-size"]} solid ${themes["dark-primary-color"]};

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;
export const ProfileContainer = styled.div`
  /* background-color: #009; */
  width: 200px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px;

  
`;
export const WrapperProfile = styled.div`
  /* background-color: #009; */
  width: min-content;
  height: min-content;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .options-profile{
    background: ${themes.bg};
    width: 150px;
    height: 60px;

    border-radius: 12px;
    box-shadow: 0 0 5px 2px ${themes['dark-primary-color']};

    z-index: 99;
    position: absolute;
    top: 60px;

    transition: all 0.5s ease;
    visibility: hidden;
    opacity: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p{
      color: ${themes['dark-primary-color']};
      cursor: pointer;
    }

    :hover{
      opacity: 1;
      visibility:  visible;
      cursor: pointer;
    }
  }

  img{
    width: 50px;
    height: 50px;
    background: #ccc;
    border-radius: 12px;
    cursor: pointer;
    :hover{
      & ~ .options-profile{
        opacity: 1;
        visibility:  visible;
      }
    }
  }

  .profile{
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: ${themes['primary-color']};
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    svg{
      width: 30px;
      height: 30px;
      fill: ${themes['dark-primary-color']};
    }

    :hover{
      & ~ .options-profile{
        opacity: 1;
        visibility: visible;
      }
    }
  }

  
`;
export const NestedRoutes = styled.div`
  /* background-color: #009; */
  width: calc(100% - 200px);
  height: 100%;

  padding: 0 50px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  ul{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    gap: 10px;

    .li-arrow{
      svg{
        position: relative;
        top: 2px;
        width: 26px;
        height: 26px;
      }
    }
    .li-path{
      cursor: pointer;
      position: relative;
      font-size: 1.2rem;
    }
  }
`;