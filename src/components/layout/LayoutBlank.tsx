import * as React from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser'
import { loginRequest } from '../../config/AuthConfig'
import { useAppDispatch, useAppSelector } from '../../helpers'
import { authLoginAzureFetch, authLoginFailed } from '../../redux/actions/Auth.actions'
import { IAuthLoginAzureRequest, IAuthState, IAuthValidate } from '../../interfaces/IAuth'
import { URL_ADMIN } from '../../constants/Parameter'
import './Layout.scss'

// Components
import ModalAlert from '../modal_alert'
import { LoadingFull } from '../loading'

// SVG Icon
import { privilegeError } from '../../constants/ErrorMessage'

const LayoutBlank = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = useMatch(URL_ADMIN)
  const { instance, inProgress } = useMsal()

  // Redux
  const auth: IAuthState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onLogout = () => navigate('/logout', { state: { from: location }, replace: true })

  const doLogin = (account: AccountInfo) => {
    const email = account?.username as string
    const request: IAuthLoginAzureRequest = {
      email,
      platform: 'Backoffice',
    }

    dispatch(
      authLoginAzureFetch(request, (data: IAuthValidate | null) => {
        if (data) {
          redirectToDashboard()
        }
      }),
    )
  }

  const isLoggedIn = () => {
    if (!auth.isLoggedIn) {
      redirectToLogin()
    }
  }

  // Redirect to dashboard if pathname is equal to /
  const redirectToDashboard = React.useCallback(() => {
    if (isHomePage) goToDashboard()
  }, [])

  const goToDashboard = () =>
    navigate(`${URL_ADMIN}/dashboard`, { state: { from: location }, replace: true })

  // MSAL login Redirect
  const redirectToLogin = React.useCallback(() => {
    if (!auth.isLoggedIn && inProgress === InteractionStatus.None) {
      instance
        .loginRedirect({
          ...loginRequest,
          account: instance.getActiveAccount() as AccountInfo,
        })
        .catch((err) => {
          if (err.errorMessage) {
            dispatch(authLoginFailed(err.errorMessage))
          }

          console.log('Layout - loginRequest - err', err)
        })
    }
  }, [])

  const setActiveAccount = (event: EventMessage): void => {
    if (event.error) {
      dispatch(authLoginFailed(event.error.message))
    }

    if (
      (event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
      event.payload
    ) {
      const payload = event.payload as AuthenticationResult
      const account = payload.account
      instance.setActiveAccount(account)

      doLogin(account as AccountInfo)
    }
  }

  React.useEffect(() => {
    isLoggedIn()

    instance.addEventCallback(setActiveAccount)
  }, [])

  if (auth.error || !auth.isLoggedIn) {
    return (
      <ModalAlert
        type="warning"
        message={auth.error ? auth.error : privilegeError}
        labelConfirmButton={auth.error ? 'Relogin' : 'Back'}
        onConfirm={auth.error ? onLogout : goToDashboard}
        showCancelButton
        labelCancelButton="Reload"
        onCancel={() => navigate(0)}
      />
    )
  }

  if (auth.isLoading || auth.isValidating) {
    let loadingMessage = 'Loading...'

    if (auth.isLoading) loadingMessage = 'Authenticating...'

    if (auth.isValidating) loadingMessage = 'Validating...'

    return <LoadingFull isFullscreen message={loadingMessage} />
  }

  return <Outlet />
}

export default LayoutBlank
