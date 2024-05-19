import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth() || {};

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        if (!auth?.user) {
          const userDetailsFromLocalStorage = JSON.parse(
            localStorage.getItem("user")
          );
          if (userDetailsFromLocalStorage) {
            setAuth(userDetailsFromLocalStorage);
          } else {
            localStorage.clear();
            return navigate("/login", { replace: true });
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        return navigate("/login", { replace: true });
      }
    };

    handleAuthentication();
  }, [auth, navigate, setAuth]);

  if (auth?.user) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default RequireAuth;
