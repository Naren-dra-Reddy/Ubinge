import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth() || {};

  if (auth?.user) {
    return <Outlet />;
  } else if (localStorage.getItem("user")) {
    const userDetails = localStorage.getItem("user");
    setAuth(userDetails);
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default RequireAuth;
