import { Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'

const GuestBook = () => {
  const location = useLocation()
  const isMatch = useMatch('/guestbook')

  if (isMatch) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default GuestBook
