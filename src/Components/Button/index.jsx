import React from "react";
import { ButtonComponent } from "./styled.js";

export function Button({ children, ...rest }) {
  return <ButtonComponent {...rest}>{children}</ButtonComponent>;
}
