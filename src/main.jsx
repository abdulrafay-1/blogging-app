import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import UserAllBlogs from "./pages/UserAllBlogs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route
            path="dashboard"
            element={<ProtectedRoute children={<Dashboard />} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute children={<Profile />} />}
          />
          <Route
            path="user/:id"
            element={<ProtectedRoute children={<UserAllBlogs />} />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
