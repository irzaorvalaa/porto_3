import { Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'

const Store = () => {
  const location = useLocation()
  const isMatch = useMatch('/store')

  if (isMatch) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default Store
