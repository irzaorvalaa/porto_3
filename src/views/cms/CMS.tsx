import { Navigate, Outlet, useLocation, useMatch } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const isMatch = useMatch("/cms");

  if (isMatch) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default Settings;
