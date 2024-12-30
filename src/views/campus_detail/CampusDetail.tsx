import * as React from 'react'
import { Breadcrumbs, Button, Divider, Skeleton, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { NavLink, useParams } from 'react-router-dom'
import { ReactComponent as TimeIcon } from '../../assets/svg/icons/time.svg'
import { ICampusDetail } from '../../interfaces/ICampus'
import { initialCampusDetailState } from '../../constants/CampusState'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchCampus } from './utilities'
import './CampusDetail.scss'

const CampusDetail = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { campusID } = useParams()

  // State
  const { reducer } = useLocalState<ICampusDetail | null>()
  const [state, dispatch] = React.useReducer(reducer, initialCampusDetailState)

  const fetchDataCampus = React.useCallback(async () => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchCampus(campusID as string, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }, [campusID])

  React.useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await fetchDataCampus()
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
          <NavLink to={`/collection/${state.data?.name}`} className="detail__breadcrumblink">
            {state.data?.name}
          </NavLink>
        </Breadcrumbs>
        <div className="detail__content">
          <div className="detail__cover">
            {state.isLoading ? (
              <Skeleton variant="rounded" className="detail__loading detail__loading--cover" />
            ) : (
              <img
                src={state.data?.campusImgUrl || '/images/no-image.png'}
                alt={state.data?.name || '-'}
              />
            )}
          </div>
          <div className="detail__info">
            <div className="detail__title">
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--title" />
              ) : (
                state.data?.name || '-'
              )}
            </div>
            <div className="detail__author">
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--author" />
              ) : (
                state.data?.address || '-'
              )}
            </div>
            <div className="detail__author">Phone:
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--author" />
              ) : (
                ' ' + (state.data?.phoneNumberWA || '-')
              )}
            </div>
            <div className="detail__author">Ext:
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--author" />
              ) : (
                ' ' + (state.data?.phoneNumberExt || '-')
              )}
            </div>
            <div className="detail__author">Email:
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--author" />
              ) : (
                ' ' + (state.data?.email || '-')
              )}
            </div>
            <Divider />
            {state.isLoading ? (
              <div>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            ) : (
              <div className="detail__item">
                <div className="detail__header">SERVICE HOURS</div>
                <div className="detail__item--times">
                  {state.data?.serviceHour.map((hour, index) => (
                    <div key={index} className="detail__item--days">
                      {hour.dayName}: {hour.startTime}-{hour.endTime}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampusDetail
