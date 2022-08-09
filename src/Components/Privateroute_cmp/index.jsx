import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export function Privateroute({ element }) {
  const { authenticate } = useContext(AuthContext);
  if (!authenticate) {
    return <Navigate to="/" />;
  }
  return element;
}
