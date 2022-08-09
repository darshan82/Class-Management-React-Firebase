import React from 'react'
import {
  InputComponent 
}from './styled.js'

export function Input({...rest}) {
  return (
    <InputComponent >
      <input {...rest} />
    </InputComponent>
  )
}
