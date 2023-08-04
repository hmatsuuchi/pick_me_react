import { useParams } from "react-router-dom";
// AccountCreate - CSS
import "./AccountCreate.scss";
// Axios
import instance_public from "../../axios/axios_public";

function AccountVerify() {
  const uidb64 = useParams().uidb64;
  const token = useParams().token;

  // create POST request
  instance_public
    .post("authentication/account_verify/" + uidb64 + "/" + token)
    .catch((err) => {
      console.log(err.response.data);
    });

  return (
    <div>
      <h1>Your account has been verified</h1>
    </div>
  );
}

export default AccountVerify;
