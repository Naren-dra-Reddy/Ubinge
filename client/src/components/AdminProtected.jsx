import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminProtected = () => {
  const { auth } = useAuth();
  if (auth?.user?.isAdmin) {
    return <Outlet />;
  }
  return null;
};

export default AdminProtected;
