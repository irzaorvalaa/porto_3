// import { useSelector } from 'react-redux'
// import { Navigate, useLocation } from 'react-router-dom'
// import { RootState } from '../../bootstrap/App.reducers'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // const {  } = useSelector((state: RootState) => state.auth)
  // const location = useLocation()

  // Redirect to login if not logged in
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }

  return children
}

export default RequireAuth
