import { lazy } from "react";

import { routes } from "../../routes";

const Login = lazy(() => import("../../pages/login"));
const Register = lazy(() => import("../../pages/register"));
const ForgotPassword = lazy(() => import("../../pages/forgot_password"));
const ResetPassword = lazy(() => import("../../pages/reset_password"));
const AccountActivation = lazy(() => import("../../pages/account_activation"));
const ResendActivation = lazy(() => import("../../pages/resend_activation"));
const Chat = lazy(() => import("../../pages/chat"));
const UploadProfilePicture = lazy(() => import("../../pages/upload_profile_picture"));
const ChangeUsername = lazy(() => import("../../pages/change_username"));
const ChangeEmail = lazy(() => import("../../pages/change_email"));
const ChangePassword = lazy(() => import("../../pages/change_password"));

export const matchPath = ({path, routePath}) => {
  const pathParts = path?.split("/")?.filter(Boolean);
  const routeParts = routePath?.split("/")?.filter(Boolean);

  if (pathParts?.length !== routeParts?.length) return null;

  const params = {};
  for (let i = 0; i < pathParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

export const routeMap = [
  { path: "/login", fetchTarget: routes?.server?.login, component: Login, title: "login" },
  { path: "/register", fetchTarget: routes?.server?.register, component: Register, title: "register" },
  { path: "/forgot_password", fetchTarget: routes?.server?.forgot_password, component: ForgotPassword, title: "forgot password" },
  { path: "/account_activation/:token", fetchTarget: routes?.server?.account_activation, component: AccountActivation, title: "account activation" },
  { path: "/reset_password/:token", fetchTarget: routes?.server?.reset_password, component: ResetPassword, title: "reset password"},
  { path: "/resend_activation", fetchTarget: routes?.server?.resend_activation, component: ResendActivation, title: "resend activation" },
  { path: "/chat", fetchTarget: routes?.server?.chat, component: Chat, title: "chat" },
  { path: "/upload_profile_picture", fetchTarget: routes?.server?.upload_profile_picture, component: UploadProfilePicture, title: "upload profile picture" },
  { path: "/change_username", fetchTarget: routes?.server?.change_username, component: ChangeUsername, title: "change username" },
  { path: "/change_email", fetchTarget: routes?.server?.change_email, component: ChangeEmail, title: "change email" },
  { path: "/change_password", fetchTarget: routes?.server?.change_password, component: ChangePassword, title: "change password" },
];
