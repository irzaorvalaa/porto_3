import * as React from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../helpers'
import { authLoginAzureFetch, authLoginFailed, authLogout } from '../../redux/actions/Auth.actions'
import { IAuthLoginAzureRequest, IAuthFEState, IAuthValidate } from '../../interfaces/IAuth'
import { URL_ADMIN } from '../../constants/Parameter'
import { LayoutProps } from '../../components/layout/interfaces'
import havePrivilege from '../../utilities/hasPrivilege'
import { useMsal } from '@azure/msal-react'
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser'
import { loginRequest } from '../../config/AuthConfig'

// Components
import ModalAlert from '../../components/modal_alert'
import { LoadingFull } from '../../components/loading'
import { privilegeError } from '../../constants/ErrorMessage'

const Login = (props: LayoutProps) => {
  const { window } = props
  const location = useLocation()
  const navigate = useNavigate()
  const isLoginPage = useMatch('/login')
  const { instance, inProgress } = useMsal()

  // Redux
  const auth: IAuthFEState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const onLogout = () => navigate('/logout', { state: { from: location }, replace: true })

  const doLogin = (account: AccountInfo) => {
    const email = account?.username as string
    const platform = "Web"
    const request: IAuthLoginAzureRequest = { email, platform }

    dispatch(
      authLoginAzureFetch(request, (data: IAuthValidate | null) => {
        if (data) {
          goToHome()
        }
      }),
    )
  }

  const goToHome = () => navigate('/', { state: { from: location }, replace: true })

  // MSAL login Redirect
  const redirectToLogin = React.useCallback(() => {
    if (!auth.isLoggedIn && inProgress === InteractionStatus.None) {
      console.log('try to login')
      instance
        .loginRedirect({
          ...loginRequest,
          account: instance.getActiveAccount() as AccountInfo,
        })
        .catch((err) => {
          if (err.errorMessage) {
            dispatch(authLoginFailed(err.errorMessage))
          }

          console.log('LayoutFE - loginRequest - err', err)
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

  const isLoggedIn = () => {
    if (!auth.isLoggedIn) {
      redirectToLogin()
    } else {
      if (auth.user != null) goToHome()
      else {
        auth.isLoggedIn = false
        auth.error = 'We have issue authenticating your account or your account does not exist'
      }
    }
  }

  React.useEffect(() => {
    
    isLoggedIn()

    instance.addEventCallback(setActiveAccount)
  }, [])

  if (auth.isLoading || auth.isValidating) {
    let loadingMessage = 'Loading...'

    if (auth.isLoading) loadingMessage = 'Authenticating...'

    if (auth.isValidating) loadingMessage = 'Validating...'

    return <LoadingFull isFullscreen message={loadingMessage} />
  }

  console.log(auth)

  if (auth.isLoggedIn && auth.user != null) 
  {
    return (
      <div className="layout-page__fe">
        <main className="layout-main__fe">
          <Outlet />
        </main>
      </div>
    )
  }
  else if ((!auth.isLoggedIn && auth.error != null) || (auth.isLoggedIn && auth.error != null))
  {
    return (
      <ModalAlert
        type="warning"
        message={auth.error}
        labelConfirmButton='Logout'
        onConfirm={onLogout}
        showCancelButton
        labelCancelButton="Reload"
        onCancel={() => navigate(0)}
      />
    )
  }
else {
    return ( <Outlet /> )
  }
}

export default Login
