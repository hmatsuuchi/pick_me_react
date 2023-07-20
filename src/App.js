// Browser Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Login from "./components/Login.js";
import Navigation from "./components/Navigation.js";
import Dashboard from "./components/Dashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
