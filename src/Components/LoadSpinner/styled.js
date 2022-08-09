import styled from 'styled-components';

export const LoadSpinnerContainer = styled.div`
  /* background-color: #009; */
  width: min-content;
  height: min-content;
`;
export const Spinner = styled.div`
  /* background-color: #009; */
  width: ${({size})=>size?size:'50px'};
  height: ${({size})=>size?size:'50px'};

  border: solid ${({border})=>border?border:'5px'} ${({color})=>color?color:'#aaa'};
  border-top: solid ${({border})=>border?border:'5px'} #444;

  border-radius: 50%;

  animation: spin 0.95s infinite ease-in-out ;
  
  @keyframes spin {
    100%{
      transform: rotate(1turn);
    }
  }
`;
