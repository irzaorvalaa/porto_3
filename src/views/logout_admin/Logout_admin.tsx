import * as React from 'react'
import { useAppDispatch } from '../../helpers'
import { useLocation, useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/actions/Auth.actions'

// Components
import { LoadingFull } from '../../components/loading'

const Logout_admin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Redux
  const dispatch = useAppDispatch()

  const redirectToLogin = React.useCallback(() => {
    return navigate('/', { state: { from: location }, replace: true })
  }, [])

  const onLogout = () => {
    dispatch(authLogout())

    setTimeout(() => {
      redirectToLogin()
    }, 2000)
  }

  React.useEffect(() => {
    onLogout()
  }, [])

  return <LoadingFull isFullscreen message="Logging out" />
}

export default Logout_admin
