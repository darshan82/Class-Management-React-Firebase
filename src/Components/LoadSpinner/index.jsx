import React from 'react'
import {
  LoadSpinnerContainer,
  Spinner
} from './styled.js'

export function LoadSpinner({size,color}) {
  return (
    <LoadSpinnerContainer>
      <Spinner size={size}/>
    </LoadSpinnerContainer>
  )
}
