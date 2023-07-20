import { useState, useEffect } from "react";
// Axios
import instance from "../axios/axios";
// Dashboard - CSS
import "./Dashboard.scss";

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      try {
        /* eslint-disable no-unused-vars */
        const { data } = await instance.get(
          "user_profile/get_logged_in_user_data"
        );
        /* eslint-disable no-unused-vars */
        if (data) {
          setUsername(data.username);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div>
      <h2>{`Welcome to the Dashboard, ${username}!`}</h2>
    </div>
  );
}

export default Dashboard;
