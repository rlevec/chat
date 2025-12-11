import { routes } from "../../../routes";

export const handleUnauthorizedError = async ({ url, options, navigate, login, logout }) => {
    try {
      const refreshResponse = await fetch('/api/refresh_token', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const accessToken = refreshData?.accessToken;
  
        // update token in context
        if (accessToken) login(accessToken);
  
        // retry original request with new token
        const retryOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const retryResponse = await fetch(url, retryOptions);
  
        if (!retryResponse.ok) {
          let errorData;
          try {
            errorData = await retryResponse.json();
          } catch {
            errorData = await retryResponse.text();
          }
          throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
        }
  
        return retryResponse.json();
      } else {
        // refresh failed, logout user
        logout();
        navigate({path: routes?.client?.login, replace: true});
        return;
      }
    } catch (error) {
      logout();
      navigate({path: routes?.client?.login, replace: true});
      return;
    }
  };