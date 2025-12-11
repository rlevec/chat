import { routes } from "../../../routes";

export const handleLogout = async ({
  logoutPostRequest,
  logout,
  navigate,
  setNotification,
}) => {
  const response = await logoutPostRequest({
    url: routes?.server?.logout,
    body: {},
  });

  if (!response?.success && response?.message) {
    setNotification({ message: response?.message, type: "error" });
    return;
  }

  await logout();

  navigate({ path: routes?.client?.login, replace: true });
};
