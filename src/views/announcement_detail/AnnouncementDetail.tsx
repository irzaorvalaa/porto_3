import * as React from 'react'
import { Breadcrumbs, Divider, Skeleton } from '@mui/material'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { NavLink, useParams } from 'react-router-dom'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchAnnouncementDetail } from './utilities'
import './AnnouncementDetail.scss'
import { IAnnouncementDetail } from '../home/components/home_announcement/interfaces'
import { initialAnnouncementDetailState } from './constants/AnnouncementDetailState'
import { FORMAT_DATE_EVENT_HEADLINE } from '../../constants/Parameter'

const AnnouncementDetail = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { announcementID } = useParams()

  // State
  const { reducer } = useLocalState<IAnnouncementDetail | null>()
  const [state, dispatch] = React.useReducer(reducer, initialAnnouncementDetailState)

  const fetchDataNewsEventDetail = React.useCallback(async () => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchAnnouncementDetail(announcementID as string, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }, [announcementID])

  React.useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await fetchDataNewsEventDetail()
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="detail">
      <div className="detail__container">
        <Breadcrumbs separator="›" className="detail__breadcrumb">
          <NavLink to="/" className="detail__breadcrumblink">
            Home
          </NavLink>
          <NavLink to={`/collection/${state.data?.title}`} className="detail__breadcrumblink">
            {state.data?.title}
          </NavLink>
        </Breadcrumbs>
        <div className="detail__content">
          <div className="detail__info">
          <div className="detail__cover">
            {state.isLoading ? (
              <Skeleton variant="rounded" className="detail__loading detail__loading--cover" />
            ) : (
              <img
                src={state.data?.announcementImgUrl || '/images/no-image.png'}
                alt={state.data?.title || '-'}
              />
            )}
          </div>
            <div className="detail__title">
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--title" />
              ) : (
                state.data?.title || '-'
              )}
            </div>
            <div className="detail__author">
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--author" />
              ) : (
                moment(state.data?.effDateStart).format(FORMAT_DATE_EVENT_HEADLINE) || '-'
              )}
            </div>
            <Divider />
            {state.isLoading ? (
              <div>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            ) : (
              <div
                className="detail__description"
                dangerouslySetInnerHTML={{ __html: state.data?.description || '-' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDetail
