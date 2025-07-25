import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/protected" replace />;
  }

  return children;
};

export default PrivateRoute;
