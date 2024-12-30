import * as React from 'react'
import { Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLocalState } from '../../helpers/useLocalState'
import { ICampus } from '../../interfaces/ICampus'
import { ICollection } from '../../interfaces/ICollection'
import { initialCampusState } from '../../constants/CampusState'
import { initialCollectionState } from '../../constants/CollectionState'
import {
  initialHomeAnnouncementState,
  initialHomeBannerState,
  initialHomeNewsEventState,
} from './constants'
import HomeSlider from './components/home_slider'
import HomeMenu from './components/home_menu'
import HomeCollection from './components/home_collection'
import HomeAnnouncement from './components/home_announcement'
import HomeNewsEvent from './components/home_news_event'
import HomeLibrary from './components/home_library'
import HomeComingSoon from './components/home_coming_soon'
import { IHomeAnnouncement } from './components/home_announcement/interfaces'
import { IHomeNewsEvent } from './components/home_news_event/interfaces'
import { IHomeMenu } from './components/home_menu/interfaces'
import { IHomeBanner } from './interfaces'
import {
  fetchAnnouncement,
  fetchBanner,
  fetchCampus,
  fetchCollection,
  fetchNews,
} from './utilities'
import { CLIENT_ID, REDIRECT_URL, TENANT_ID } from '../../constants/SecretKey'
import { IAuthFEState } from '../../interfaces/IAuth'
import { useAppSelector } from '../../helpers'
import './Home.scss'
import DetailLoginAlert from '../detail/components/detail_login_alert'
import HomeBTSCategory from './components/home_bts_category/HomeBTSCategory'
import HomeCategoty from './components/home_cateogry/HomeCategoty'
import HomeCard from './components/home_card/HomeCard'
import MyAccount from '../my_account/MyAccount'

const Home = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const location = useLocation()
  const navigate = useNavigate()

  // Redux
  const auth: IAuthFEState = useAppSelector((state) => state.auth)

  // State
  const { reducer: bannerReducer } = useLocalState<IHomeBanner[]>()
  const { reducer: campusReducer } = useLocalState<ICampus[]>()
  const { reducer: collectionReducer } = useLocalState<ICollection[]>()
  const { reducer: announcementReducer } = useLocalState<IHomeAnnouncement[]>()
  const { reducer: newsReducer } = useLocalState<IHomeNewsEvent[]>()
  const [bannerState, bannerDispatch] = React.useReducer(bannerReducer, initialHomeBannerState)
  const [campusState, campusDispatch] = React.useReducer(campusReducer, initialCampusState)
  const [openLoginAlert, setOpenLoginAlert] = React.useState<boolean>(false)
  const [collectionState, collectionDispatch] = React.useReducer(
    collectionReducer,
    initialCollectionState,
  )
  const [announcementState, announcementDispatch] = React.useReducer(
    announcementReducer,
    initialHomeAnnouncementState,
  )
  const [newsState, newsDispatch] = React.useReducer(newsReducer, initialHomeNewsEventState)
  const [comingSoonOpen, setComingSoonOpen] = React.useState<boolean>(false)

  const goToLogin = () => window.location.replace('/login')

  const handleTalkToUsOpen = () => {
    if (!auth.isLoggedIn) setOpenLoginAlert(true)
    else navigate('/talk_to_us', { state: { from: location }, replace: true })
  }

  const fetchDataBanner = React.useCallback(async () => {
    try {
      bannerDispatch({ type: 'request' })

      const response = await fetchBanner(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      bannerDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      bannerDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const fetchDataCollection = React.useCallback(async () => {
    try {
      collectionDispatch({ type: 'request' })

      const response = await fetchCollection(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      collectionDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      collectionDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const fetchDataCampus = React.useCallback(async () => {
    try {
      campusDispatch({ type: 'request' })

      const response = await fetchCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      campusDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      campusDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const fetchDataAnnouncement = React.useCallback(async (campusID: string) => {
    try {
      announcementDispatch({ type: 'request' })

      const response = await fetchAnnouncement(campusID, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      announcementDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      announcementDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const fetchDataNews = React.useCallback(async (campusID: string) => {
    try {
      newsDispatch({ type: 'request' })

      const response = await fetchNews(campusID, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      newsDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      newsDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const handleAnnouncementCampusChange = async (campus: ICampus) => {
    await fetchDataAnnouncement(campus.id)
  }

  const handleNewsCampusChange = async (campus: ICampus) => {
    await fetchDataNews(campus.id)
  }

  const handleMenuClick = (menu: IHomeMenu) => {
    if (menu.type !== 'ebook') {
      setComingSoonOpen(true)
    } else {
      navigate('/collection/EBOOK', { state: { from: location }, replace: true })
    }
  }

  React.useEffect(() => {
    ;(async () => {
      await fetchDataBanner()
      await fetchDataCollection()
      await fetchDataCampus()
      await fetchDataAnnouncement('')
      await fetchDataNews('')
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="home">
      <div className="home__container">
        <HomeCategoty />
        <div className="home__header">
          <HomeSlider loading={bannerState.isLoading} data={bannerState.data} />
        </div>
      </div>
      <HomeLibrary loading={campusState.isLoading} data={campusState.data} />

      <HomeBTSCategory />

      <HomeCard />

      <HomeComingSoon open={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />

      <DetailLoginAlert
        open={openLoginAlert}
        onClose={() => setOpenLoginAlert(false)}
        onConfirm={() => goToLogin()}
      />
    </div>
  )
}

export default Home
