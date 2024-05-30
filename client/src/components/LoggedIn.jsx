import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LoggedIn = () => {
  const { user } = useAuth0();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedIn;
