import { useParams } from "react-router-dom";
import { useState } from "react";
// NewPassword - CSS
import "./NewPassword.scss";
// Axios
import instance_public from "../../axios/axios_public";

function NewPassword() {
  const [password, setPassword] = useState("");

  const uidb64 = useParams().uidb64;
  const token = useParams().token;

  const submit = async (e) => {
    e.preventDefault();

    // create POST request
    await instance_public
      .post("authentication/new_password/" + uidb64 + "/" + token, password)
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="password">password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
    </form>
  );
}

export default NewPassword;
