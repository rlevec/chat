import { routes } from "../../../routes";

export const handleLogin = async ({ response, setData, login, navigate}) => {
    if (response?.success && response?.accessToken && response?.userId) {
      setData(response);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await login(response.accessToken);
      navigate({path: routes?.client?.chat, replace: true});
      setData(null)
    } else {
      setData(response);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setData(null)
    }
  
    return response;
  };