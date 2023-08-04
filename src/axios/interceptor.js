import instance from "./axios";

let refresh = false;

instance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (error.response.status === 401 && !refresh && refreshToken) {
      refresh = true;
      const response = await instance.post("authentication/token/refresh/", {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        console.log("refreshing token");
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        // attaches new access token and retries original request
        error.config.headers[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return instance(error.config);
      }
    }

    refresh = false;
    return error;
  }
);
