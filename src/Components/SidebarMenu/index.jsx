import React from "react";
import {
  BsCalendarDate,
  BsFileEarmarkPerson,
  BsPiggyBank,
} from "react-icons/bs";
// Icons
import { CgMenu } from "react-icons/cg";
import { FiMessageSquare } from "react-icons/fi";
import { IoFolderOpenOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
//
import { Link, useLocation } from "react-router-dom";
// Styles
import { LiSubFolder, SideMenu, SubFolder } from "./styled.js";

export default function SidebarMenu() {
  const [OPEN_MENU, SET_OPEN_MENU] = React.useState(false);
  const [OPEN_CORE_MODULES, SET_OPEN_CORE_MODULES] = React.useState(false);
  //
  const location = useLocation();
  let isSameRoute = (route) => (location.pathname === route ? "inRoute" : "");

  return (
    <SideMenu className={OPEN_MENU && "isOpen"}>
      <div className="head-menu">
        <CgMenu onClick={() => SET_OPEN_MENU(!OPEN_MENU)} />
      </div>
      <div className="list-menu">
        <ul>
          <li className={isSameRoute("/dashboard")}>
            <Link to={"/dashboard"}>
              <MdOutlineSpaceDashboard />
              <p className="name-list">Dashboard</p>
            </Link>
          </li>
          <li className={isSameRoute("/dashboard/schedule")}>
            <Link to={"schedule"}>
              <BsCalendarDate />
              <p className="name-list">Schedule</p>
            </Link>
          </li>
          {/* Sub folder */}
          <LiSubFolder
            className={("li-sub-folder ", OPEN_MENU && "isOpen")}
            onClick={() => SET_OPEN_CORE_MODULES(!OPEN_CORE_MODULES)}
          >
            <a className={OPEN_MENU && "isOpen"}>
              <IoFolderOpenOutline />
            </a>
            <div className={"sub-folder"}>
              <SubFolder className={OPEN_MENU && "isOpen"}>
                <li className={isSameRoute("/dashboard/manage-class")}>
                  <Link to={"manage-class"}>
                    <SiGoogleclassroom className="icon-sub-folder" />
                    <p>Manage Class</p>
                  </Link>
                </li>
                <li className={isSameRoute("/dashboard/students")}>
                  <Link to={"students"}>
                    <BsFileEarmarkPerson className="icon-sub-folder" />
                    <p>Students</p>
                  </Link>
                </li>
              </SubFolder>
            </div>
          </LiSubFolder>
          {/* Sub folder */}

          <li className={isSameRoute("/dashboard/finances")}>
            <Link to={"finances"}>
              <BsPiggyBank />
              <p className="name-list">Finances</p>
            </Link>
          </li>
          <li className={isSameRoute("/dashboard/feedback")}>
            <Link to={"feedback"}>
              <FiMessageSquare />
              <p className="name-list">Feedback</p>
            </Link>
          </li>
        </ul>
      </div>
    </SideMenu>
  );
}
