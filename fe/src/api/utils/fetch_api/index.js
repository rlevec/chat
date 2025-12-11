import { routes } from "../../../routes";

import { handleUnauthorizedError } from "../unauthorized_error";

export const fetchAPI = async ({ url, options, navigate, token, login, logout }) => {

    const config = {
      method: (options.method || "GET").toUpperCase(),
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };
  
    if (options.body && !["GET", "HEAD"].includes(config.method)) {
      if (options.body instanceof FormData) {
        if (config.headers['Content-Type']) {
          delete config.headers['Content-Type'];
        }
        config.body = options.body;
      } else {
        config.body = JSON.stringify(options.body ?? {});
        config.headers["Content-Type"] = "application/json";
      }
    }
  
    const response = await fetch(url, config);
  
    if (response.status === 401) {
      return handleUnauthorizedError({ url, options: config, navigate, login, logout });
    }
  
    if (response.status === 403) {
      navigate({path: routes?.client?.chat, replace: true });
      return;
    }
  
    if (!response.ok && response.status === 500) {
      return {success: false, message: "Internal server error"}
    }
  

    return response.json();
  };