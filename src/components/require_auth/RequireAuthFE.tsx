import { Navigate, useLocation } from 'react-router-dom'
import { URL_ADMIN, URL_EXCEPTION } from '../../constants/Parameter'
import { useAppSelector } from '../../helpers'
import { IAuthFEState } from '../../interfaces/IAuth'

const RequireAuthFE = ({ children }: { children: JSX.Element }) => {
  // Redux
  const auth: IAuthFEState = useAppSelector((state) => state.auth)

  const location = useLocation()

  const isExceptUrl = () => URL_EXCEPTION.includes(location.pathname)

  // Redirect to login if not logged in
  if (!auth.isLoggedIn && !isExceptUrl()) {
  return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuthFE
