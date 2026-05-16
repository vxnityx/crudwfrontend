import { Navigate } from "react-router-dom";
import { getAccessToken } from "../tokens";

const ProtectedRoute = ({ children }: any) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;