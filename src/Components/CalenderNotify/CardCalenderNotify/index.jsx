import React from 'react';

import { 
  CardCalenderNotifyContainer
 } from './styles.js';

export function CardCalenderNotify({x}) {
  return (
    <CardCalenderNotifyContainer>
      <div className="marker"/>
      <div className="content-card">
        <h1>{x.title}</h1>
        <span>{`${x.start} ${x.end===x.start?'':'- '+x.end}`}</span>
      </div>
    </CardCalenderNotifyContainer>
  );
}