import React, { useState } from "react";
// Axios instance
import instance from "../../axios/axios";
// Login - CSS
import "./Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    // create POST request
    const { data } = await instance.post("authentication/token/", user);

    if (data) {
      // initialize access and refresh tokens in localstorage
      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      // redirect
      window.location.href = "/dashboard";
    } else {
      console.log("login error");
    }
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="username">username:</label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required></input>
      <label htmlFor="password">password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required></input>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
