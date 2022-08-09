import React from "react";

export const CalenderContext = React.createContext(null);

export function CalenderContextProvider({ children }) {
  const [CURRENT_EVENT, SET_CURRENT_EVENT] = React.useState({});
  const [INIT_DATE, SET_INIT_DATE] = React.useState(new Date());

  return (
    <CalenderContext.Provider
      value={{ INIT_DATE, SET_INIT_DATE, CURRENT_EVENT, SET_CURRENT_EVENT }}
    >
      {children}
    </CalenderContext.Provider>
  );
}
