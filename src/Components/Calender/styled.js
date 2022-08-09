import styled from "styled-components";
import themes from "../../themes/themes.json";

export const WrapperCalenderContainer = styled.div`
  
`;

export const CalenderContainer = styled.div`
  background-color: ${themes.bg};
  box-shadow: ${themes.shadow};
  border-radius: ${themes["border-radius"]};

  width: ${({width})=>width?width:"720px"} ;
  height: ${({height})=>height?height:"450px"} ;

  padding: 20px;

  display: flex;
  /* justify-content: center;
  align-items: flex-start; */
  flex-direction: column;
  .fc {
    width: 100%;
    height: 100%;

    h2 {
      font-weight: 400;
    }

    button {
      background: ${themes["dark-primary-color"]};
      border: none;
    }
    .fc-daygrid-day-frame {
      cursor: pointer;
    }
  }
`;
