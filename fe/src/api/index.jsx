import { useState, useEffect } from "react";

import { useRouter } from "../context/router";

import { useAuth } from "../context/auth";

import { handleLogin } from "./utils/login";

import { handleAuth } from "./utils/auth";

import { fetchAPI } from "./utils/fetch_api";

export const useAPI = ({ initialUrl = null, initialOptions = {} } = {}) => {
  const { token, login, logout } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { navigate } = useRouter();

  const request = async ({ url, options = {} }) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchAPI({
        url,
        options,
        navigate,
        token,
        login,
        logout,
      });
      const isLogin = options?.method === "POST" && options?.isLogin;
      const isAuth = options?.method === "POST" && options?.isAuth;
      if (isLogin) {
        await handleLogin({ response: result, setData, login, navigate });
      } else if (isAuth) {
        await handleAuth({ response: result, setData, navigate });
      } else {
        setData(result);
        return result;
      }
    } catch (err) {
      const result = {success: false, message:err.message || "Internal server error" }
      setData(result)
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = (params = {}) =>
    request({ url: params.url, options: { ...params.options, method: "GET" } });
  const post = (params = {}) =>
    request({
      url: params.url,
      options: { ...params.options, method: "POST", body: params.body },
    });
  const put = (params = {}) =>
    request({
      url: params.url,
      options: { ...params.options, method: "PUT", body: params.body },
    });
  const patch = (params = {}) =>
    request({
      url: params.url,
      options: { ...params.options, method: "PATCH", body: params.body },
    });
  const del = (params = {}) =>
    request({
      url: params.url,
      options: { ...params.options, method: "DELETE" },
    });

  useEffect(() => {
    if (initialUrl) {
      request({ url: initialUrl, options: initialOptions });
    }
  }, [initialUrl]);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    patch,
    del,
    refetch: () => request({ url: initialUrl, options: initialOptions }),
  };
};

export default useAPI;
