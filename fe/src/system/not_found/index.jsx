import React from "react";

import { useAuth } from "../../context/auth";

import Button from "../../components/button";

import { useRouter } from "../../context/router";

import { useWindowDimension } from "../../hooks";

import { routes } from "../../routes";

import notFoundStyles from "./styles/not_found.module.css"

export default function NotFound() {

  const {deviceType} = useWindowDimension()

  const { token } = useAuth();
  
  const { navigate } = useRouter();

  const isAuth = Boolean(token);

  return (
    <div className={`${notFoundStyles?.wrapper} ${notFoundStyles?.[deviceType]}`}>
      <div className={notFoundStyles?.container}>
        <div className={notFoundStyles?.title}>404</div>
        <div className={notFoundStyles?.text}>The page you're looking for does not exist or was moved.</div>
        <Button
          title={isAuth ? "Go to Chat" : "Login"}
          onClick={() =>
            navigate({
              path: routes?.client?.[isAuth ? "chat" : "login"],
              replace: true,
            })
          }
          renderType="primary"
        />
      </div>
    </div>
  );
}
