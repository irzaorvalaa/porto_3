import * as React from 'react'
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../helpers'
import { IAuthFEState } from '../../interfaces/IAuth'
import { ITalkToUsState } from '../../interfaces/ITalkToUs'
import { talkToUsClose, talkToUsOpen } from '../../redux/actions/TalkToUs.actions'
import { IHeaderMenu } from '../header/interfaces'
import { LayoutProps } from './interfaces'
import './Layout.scss'
import { useMsal } from '@azure/msal-react'
import {
  InteractionStatus,
} from '@azure/msal-browser'

// Components
import ModalAlert from '../modal_alert'
import Footer from '../footer'
import HeaderFE from '../header/HeaderFE'
import TalkToUs from '../talk_to_us'
import { LoadingFull } from '../loading'
import { privilegeError } from '../../constants/ErrorMessage'

const LayoutFE = (props: LayoutProps) => {
  const { window } = props
  const location = useLocation()
  const navigate = useNavigate()
  const isLoginPage = useMatch('/login')
  const { inProgress } = useMsal()

  // Redux
  const auth: IAuthFEState = useAppSelector((state) => state.auth)
  const talkToUs: ITalkToUsState = useAppSelector((state) => state.talkToUs)

  const dispatch = useAppDispatch()

  const container = window !== undefined ? () => window().document.body : undefined
  
  const onLogout = () => navigate('/logout', { state: { from: location }, replace: true })

  const goToHome = () => navigate('/', { state: { from: location }, replace: true })

  const redirectToLogin = React.useCallback(() => {
    if (!auth.isLoggedIn && inProgress === InteractionStatus.None) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [])

  const handleTalkToUsOpen = () => dispatch(talkToUsOpen())

  const handleTalkToUsClose = () => dispatch(talkToUsClose())

  const isLoggedIn = () => {
    if (!auth.isLoggedIn) {
      // redirectToLogin()
    }
  }

  const onClickPassword = () => navigate('/profile', { state: { from: location }, replace: true })

  const onClickMenu = (menu: IHeaderMenu) => {
    if (menu.key === 'talkToUs') navigate('/talk_to_us', { state: { from: location }, replace: true })
  }

  // Start: Change Password
  const handleOpenChangePassword = () => null // setOpenChangePassword(true)
  // End: Change Password

  const isNoHavePrivilege = (): boolean => (auth.isLoggedIn && auth.user) as boolean

  React.useEffect(() => {
    
    isLoggedIn()

  }, [])

  if (auth.error) {
    return (
      <ModalAlert
        type="warning"
        message={auth.error ? auth.error : privilegeError}
        labelConfirmButton={auth.error ? 'Relogin' : 'Back'}
        onConfirm={auth.error ? onLogout : goToHome}
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

  return (
    <div className="layout-page__fe">
      { !isLoginPage && (
      <HeaderFE
        user={auth ? auth.user : null}
        isLoggedIn={auth.isLoggedIn}
        onChangePassword={handleOpenChangePassword}
        onLogout={onLogout}
        onClickProfile={onClickPassword}
        onClickMenu={onClickMenu}
      />
      )}

      <main className="layout-main__fe">
        <Outlet />
      </main>

      <TalkToUs 
        user={auth ? auth.user : null} 
        open={talkToUs.open} 
        onClose={handleTalkToUsClose} />

      { !isLoginPage && ( <Footer /> )}
    </div>
  )
}

export default LayoutFE
