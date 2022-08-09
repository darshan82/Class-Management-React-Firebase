import React from "react";
//
import { AuthContext } from "../../Contexts/AuthContext";
//
import {
  HeaderMenuContainer,
  ProfileContainer,
  NestedRoutes,
} from "./styled.js";
//
import { BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { WrapperProfile } from "./styled";
import { useNavigate } from "react-router-dom";

export default function HeaderMenu() {
  // Hooks
  const { userGoogle, logOut } = React.useContext(AuthContext);
  const navigate = useNavigate();
  let arr_routes = window.location.pathname.split("/").join(",/,").split(",");

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  return (
    <HeaderMenuContainer>
      <NestedRoutes>
        <ul>
          {arr_routes.map((x, i) => {
            let name = x.replace('-',' ')
            if (i === 0 || i === 1) return;
            if (x === "/") {
              return (
                <li key={i} className="li-arrow">
                  <MdKeyboardArrowRight />
                </li>
              );
            }
            return (
              <li key={i} className="li-path" onClick={() => {}}>
                {name[0].toUpperCase() + name.slice(1)}
              </li>
            );
          })}
        </ul>
      </NestedRoutes>
      <ProfileContainer>
        <WrapperProfile>
          {userGoogle?.avatar ? (
            <img src={userGoogle?.avatar} alt={userGoogle?.name} />
          ) : (
            <div className="profile">
              <BsFillPersonFill />
            </div>
          )}
          <div className="options-profile">
            <p onClick={handleLogOut}>Log out</p>
          </div>
        </WrapperProfile>
      </ProfileContainer>
    </HeaderMenuContainer>
  );
}
