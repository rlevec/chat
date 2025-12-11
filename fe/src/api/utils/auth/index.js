import { routes } from "../../../routes";

export const handleAuth = async ({ response, setData, navigate}) => {
    if (response?.success) {
      setData(response);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate({path: routes?.client?.chat});
      setData(null)
    } else {
      setData(response);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setData(null)
    }
    return response;
  };