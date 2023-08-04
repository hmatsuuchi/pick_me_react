import { useState, useEffect } from "react";
// Browser Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import ProtectedRoute from "./components/ProtectedRoute.js";
import Login from "./components/authentication/Login.js";
import Navigation from "./components/Navigation.js";
import Dashboard from "./components/Dashboard.js";
import AccountCreate from "./components/authentication/AccountCreate.js";
import AccountVerify from "./components/authentication/AccountVerify.js";
import PasswordReset from "./components/authentication/PasswordReset.js";
import NewPassword from "./components/authentication/NewPassword.js";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("refresh_token") === null) {
      setIsAuth(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation isAuth={isAuth} />
      <Routes>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/account_create" element={<AccountCreate />} />
        <Route
          path="/account_verify/:uidb64/:token"
          element={<AccountVerify />}
        />
        <Route path="/password_reset" element={<PasswordReset />} />
        <Route path="/new_password/:uidb64/:token" element={<NewPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
