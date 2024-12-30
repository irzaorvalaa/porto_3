import { Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'

const UserManagement = () => {
  const location = useLocation()
  const isMatch = useMatch('/setting')

  if (isMatch) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default UserManagement
