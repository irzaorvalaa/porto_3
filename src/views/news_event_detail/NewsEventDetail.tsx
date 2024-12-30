import * as React from 'react'
import { Breadcrumbs, Divider, Skeleton } from '@mui/material'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import { NavLink, useParams } from 'react-router-dom'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchNewsEventDetail } from './utilities'
import './NewsEventDetail.scss'
import { INewsEventDetail } from '../home/components/home_news_event/interfaces'
import { initialNewsEventDetailState } from './constants/NewsEventDetailState'
import { FORMAT_DATE_EVENT_HEADLINE } from '../../constants/Parameter'

const NewsEventDetail = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { newsID } = useParams()

  // State
  const { reducer } = useLocalState<INewsEventDetail | null>()
  const [state, dispatch] = React.useReducer(reducer, initialNewsEventDetailState)

  const fetchDataNewsEventDetail = React.useCallback(async () => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchNewsEventDetail(newsID as string, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }, [newsID])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    ;(async () => {
      await fetchDataNewsEventDetail()
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="news">
      <div className="news__container">
        <Breadcrumbs separator="›" className="news__breadcrumb">
          <NavLink to="/" className="news__breadcrumblink">
            Home
          </NavLink>
          <NavLink to={`/news/${state.data?.id}`} className="news__breadcrumblink">
            {state.data?.title}
          </NavLink>
        </Breadcrumbs>
        <div className="news__content">
          <div className="news__cover">
            {state.isLoading ? (
              <Skeleton variant="rounded" className="news__loading news__loading--cover" />
            ) : (
              <img
                src={state.data?.newsImgUrl || '/images/no-image.png'}
                alt={state.data?.title || '-'}
              />
            )}
          </div>
          <div className="news__info">
            <div className="news__title">
              {state.isLoading ? (
                <Skeleton variant="text" className="news__loading news__loading--title" />
              ) : (
                state.data?.title || '-'
              )}
            </div>
            <div className="news__author">
              {state.isLoading ? (
                <Skeleton variant="text" className="news__loading news__loading--author" />
              ) : (
                'by ' + state.data?.author || '-'
              )}
            </div>
            <div className="news__keyword">
              {state.isLoading ? (
                <Skeleton variant="text" className="news__loading news__loading--keyword" />
              ) : (
                moment(state.data?.publishDate).format(FORMAT_DATE_EVENT_HEADLINE) || '-'
              )}
            </div>
            <div className="news__keyword">
              {state.isLoading ? (
                <Skeleton variant="text" className="news__loading news__loading--keyword" />
              ) : (
                state.data?.caption || '-'
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
                className="news__description"
                dangerouslySetInnerHTML={{ __html: state.data?.description || '-' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsEventDetail
