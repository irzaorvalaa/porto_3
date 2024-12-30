import { Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'

const SchoolSetting = () => {
  const location = useLocation()
  const isMatch = useMatch('/school-setting')

  if (isMatch) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default SchoolSetting
