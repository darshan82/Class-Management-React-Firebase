import React from "react";
import { Outlet } from "react-router-dom";
import { DashboarContainer, SideContent, MainContent } from "./styled.js";
//
import SidebarMenu from "../../Components/SidebarMenu/index.jsx";
import HeaderMenu from "../../Components/HeaderMenu/index.jsx";

export function Dashboard() {
  return (
    <>
      <DashboarContainer>
        <SidebarMenu />
        <SideContent>
          <HeaderMenu />
          <MainContent>{<Outlet />}</MainContent>
        </SideContent>
      </DashboarContainer>
    </>
  );
}
