import React from "react";

import headerStyles from "./styles/header.module.css";

import Button from "../../../button";

import useAPI from "../../../../api";

import { useAuth } from "../../../../context/auth";
import { useRouter } from "../../../../context/router";

import { handleLogout } from "../../utils";

export default function Header(props) {
  const { logout } = useAuth();
  const { navigate } = useRouter();
  const { post: logoutPostRequest } = useAPI();

  return (
    <div className={headerStyles?.wrapper}>
      <div className={headerStyles?.container}>
        <Button
          replacementClassName={headerStyles?.logout_button}
          onClick={() =>
            handleLogout({
              logoutPostRequest,
              logout,
              navigate,
              setNotification: props?.setNotification,
            })
          }
          iconType={"LogOut"}
          iconClassName={headerStyles?.logout_button_svg}
        />
        <Button
          replacementClassName={headerStyles?.hamburger_button}
          onClick={props?.activateSidebar}
          iconType={"Bars"}
          iconClassName={headerStyles?.hamburger_button_svg}
        />
      </div>
    </div>
  );
}
