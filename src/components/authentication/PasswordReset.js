import { useState } from "react";
// PasswordReset - CSS
import "./PasswordReset.scss";
// Axios
import instance_public from "../../axios/axios_public";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setEmailSent(true);

    // create POST request
    await instance_public
      .post("authentication/password_reset/", email)
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return emailSent ? (
    <h1>Your email has been sent!</h1>
  ) : (
    <form onSubmit={submit}>
      <label htmlFor="email">email:</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required></input>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default PasswordReset;
