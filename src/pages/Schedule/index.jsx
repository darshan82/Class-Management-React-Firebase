import React from 'react';
import Calender from '../../Components/Calender/index.jsx';
import { ScheduleContainer } from './styled.js';


export function Schedule() {
  return (
    <ScheduleContainer>
      <Calender width={'100%'} height={'calc(100vh - 145px)'}/>
    </ScheduleContainer>
  );
}