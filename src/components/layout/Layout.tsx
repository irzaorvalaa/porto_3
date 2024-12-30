import * as React from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material'
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
import { LayoutProps } from './interfaces'
import havePrivilege from '../../utilities/hasPrivilege'
import './Layout.scss'

// Components
import AvatarMenu from '../avatar_menu'
import DrawerMenu from '../drawer'
import ModalAlert from '../modal_alert'
import { LoadingFull } from '../loading'

// SVG Icon
import { ReactComponent as MenuIcon } from '../../assets/svg/icons/menu.svg'
import { privilegeError } from '../../constants/ErrorMessage'

const Layout = (props: LayoutProps) => {
  const { window } = props
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = useMatch(URL_ADMIN)
  const { instance, inProgress } = useMsal()

  // Redux
  const auth: IAuthState = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const container = window !== undefined ? () => window().document.body : undefined

  const onLogout = () => navigate('/admin/logout', { state: { from: location }, replace: true })

  const doLogin = (account: AccountInfo) => {
    const email = account?.username as string
    const platform = "Backoffice"
    const request: IAuthLoginAzureRequest = { email, platform }

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
    } else if (auth.isLoggedIn) {
      redirectToDashboard()
    } else {
      goToHome()
    }
  }

  // Redirect to dashboard if pathname is equal to /
  const redirectToDashboard = React.useCallback(() => {
    if (isHomePage) goToDashboard()
  }, [])

  const goToDashboard = () =>
    navigate(`${URL_ADMIN}/dashboard`, { state: { from: location }, replace: true })
  const goToHome = () => navigate('/', { state: { from: location }, replace: true })

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

  const isNoHavePrivilege = (): boolean =>
    (auth.isLoggedIn &&
      auth.user &&
      auth.user.defaultAssignedMenu &&
      !havePrivilege(location.pathname)) as boolean

  React.useEffect(() => {
    isLoggedIn()

    instance.addEventCallback(setActiveAccount)
  }, [])

  if (auth.error) {
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

  if (!auth.isLoggedIn) return <Outlet />

  return (
    <div className="layout-page">
      <AppBar position="fixed" className="layout-appbar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className="layout-appbar__icon"
            onClick={handleDrawerToggle}
          >
            <MenuIcon className="fill-current text-black w-6 h-6" />
          </IconButton>
          <div className="flex-grow"></div>
          <AvatarMenu 
            name={auth.user?.name} 
            roleName={auth.user?.assignedRole?.find(x => x.roleId == auth.user?.defaultRoleID)?.roleName}
            onLogout={onLogout} />
        </Toolbar>
      </AppBar>
      <nav className="layout-nav">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            onClick: () => handleDrawerToggle(),
          }}
          className="layout-nav__drawer layout-nav__drawer--mobile"
        >
          <DrawerMenu />
        </Drawer>
        <Drawer variant="permanent" className="layout-nav__drawer layout-nav__drawer--desktop" open>
          <DrawerMenu />
        </Drawer>
      </nav>
      <main className="layout-main">
        <Toolbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
