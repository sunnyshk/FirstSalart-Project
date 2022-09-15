import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  if (!user) {
    // toast.error("Please Login First");
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
