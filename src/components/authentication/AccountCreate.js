import { useState } from "react";
// AccountCreate - CSS
import "./AccountCreate.scss";
// Axios
import instance_public from "../../axios/axios_public";

function AccountCreate() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // form validation
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [passwordLength, setPasswordLength] = useState(null);
  const [usernameLength, setUsernameLength] = useState(null);

  function checkPasswordsMatch() {
    if (password === passwordConfirm && passwordLength) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }

  function checkPasswordLength() {
    if (password.length >= 8 && passwordConfirm.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }

  function checkUsernameLength() {
    if (username.length > 0 && username.length <= 64) {
      setUsernameLength(true);
    } else {
      setUsernameLength(false);
    }
  }

  const submit = async (e) => {
    e.preventDefault();

    if (passwordsMatch && passwordLength && usernameLength) {
      const user = {
        username: username,
        email: email,
        password: password,
      };

      // create POST request
      await instance_public
        .post("authentication/account_create/", user)
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="username">username:</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkUsernameLength();
          }}
          onKeyUp={checkUsernameLength}
          required></input>
        <label htmlFor="email">email:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required></input>
        <label htmlFor="password">password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordsMatch();
            checkPasswordLength();
          }}
          onKeyUp={() => {
            checkPasswordsMatch();
            checkPasswordLength();
          }}
          required></input>
        <label htmlFor="passwordConfirm">retype password:</label>
        <input
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            checkPasswordsMatch();
            checkPasswordLength();
          }}
          onKeyUp={() => {
            checkPasswordsMatch();
            checkPasswordLength();
          }}
          required></input>
        <button type="submit">Login</button>
        {passwordsMatch ? <div>passwords match</div> : null}
        {passwordLength ? <div>passwords length met</div> : null}
        {usernameLength ? <div>username length met</div> : null}
      </form>
    </div>
  );
}

export default AccountCreate;
