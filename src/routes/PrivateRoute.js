import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("public Route User: ", user);
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
