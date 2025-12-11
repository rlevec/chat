import { routes } from "../../../../../routes";

export const fieldMap = [
    {
      id: 1,
      frontendSlug: "username",
      title: "Change Username",
      redirect: routes?.client?.change_username,
    },
    {
      id: 2,
      frontendSlug: "email",
      title: "Change Email",
      redirect: routes?.client?.change_email,
    },
    {
      id: 3,
      frontendSlug: "password",
      title: "Change Password",
      redirect: routes?.client?.change_password,
    },
  ];
  
  export const userDataMap = [
    {
      valueKey: "contacts",
      label: "Contacts",
    },
    {
      valueKey: "username",
      label: "Username",
    },
  ];