import * as React from 'react'
import { Breadcrumbs, Button, Divider, Skeleton } from '@mui/material'
import { useSnackbar } from 'notistack'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ICollectionDetail } from '../../interfaces/ICollection'
import { initialCollectionDetailState } from '../../constants/CollectionState'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchCollection } from './utilities'
import { IAuthFEState } from '../../interfaces/IAuth'
import { useAppSelector } from '../../helpers'
import DetailLoginAlert from './components/detail_login_alert'
import './Detail.scss'

const Detail = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { collectionID } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  // Redux
  const auth: IAuthFEState = useAppSelector((state) => state.auth)

  // State
  const { reducer } = useLocalState<ICollectionDetail | null>()
  const [state, dispatch] = React.useReducer(reducer, initialCollectionDetailState)
  const [openAlert, setOpenAlert] = React.useState<boolean>(false)

  const fetchDataCollection = React.useCallback(async () => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchCollection(collectionID as string, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }, [collectionID])

  const goToLogin = () => navigate('/login', { state: { from: location }, replace: true })

  React.useEffect(() => {
    window.scrollTo(0, 0)
    ;(async () => {
      await fetchDataCollection()
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
          <NavLink
            to={`/collection/${state.data?.collectionTypeID}`}
            className="detail__breadcrumblink"
          >
            {state.data?.collectionType}
          </NavLink>
          <NavLink to={`/detail/${collectionID}`} className="detail__breadcrumblink--current">
            {state.data?.title}
          </NavLink>
        </Breadcrumbs>
        <div className="detail__content">
          <div className="detail__cover">
            {state.isLoading ? (
              <Skeleton variant="rounded" className="detail__loading detail__loading--cover" />
            ) : (
              <img
                src={state.data?.collectionImgUrl || '/images/no-image.png'}
                alt={state.data?.title || '-'}
              />
            )}

            {state.isLoading ? (
              <Skeleton variant="rounded" className="detail__loading detail__loading--button" />
            ) : auth.isLoggedIn ? (
              <NavLink to={`/read/${collectionID}`}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="button button--primary"
                >
                  READ
                </Button>
              </NavLink>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="button button--primary"
                onClick={() => setOpenAlert(true)}
              >
                READ
              </Button>
            )}
          </div>
          <div className="detail__info">
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
                state.data?.author.map((item) => item.name).join(', ') ?? '-'
              )}
            </div>
            <div className="detail__keyword">
              {state.isLoading ? (
                <Skeleton variant="text" className="detail__loading detail__loading--keyword" />
              ) : (
                state.data?.keyword || '-'
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
            <Divider />
            <div className="detail__infodetail">
              {state.isLoading ? <Skeleton variant="text" width={70} /> : 'Detail'}
            </div>
            {state.isLoading ? (
              <div>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </div>
            ) : (
              <div className="detail__grid">
                <div className="detail__item">
                  <div className="detail__key">Bibli:</div>
                  <div className="detail__value">{state.data?.bibli || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">ISBN:</div>
                  <div className="detail__value">{state.data?.isbn || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">External ID:</div>
                  <div className="detail__value">{state.data?.externalID || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">Publisher:</div>
                  <div className="detail__value">{state.data?.publisher || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">Collection Type:</div>
                  <div className="detail__value">{state.data?.collectionType || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">Edition:</div>
                  <div className="detail__value">{state.data?.edition || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">Year:</div>
                  <div className="detail__value">{state.data?.publicationYear || '-'}</div>
                </div>
                <div className="detail__item">
                  <div className="detail__key">Total:</div>
                  {state.data?.stockInCampus && state.data.stockInCampus.length > 0 ? (
                    state.data.stockInCampus.map((stock, index) => (
                      <div key={index} className="detail__value">
                        {stock.campusName} ({stock.total})
                      </div>
                    ))
                  ) : (
                    <div className="detail__value">-</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DetailLoginAlert open={openAlert} onClose={() => setOpenAlert(false)} onConfirm={() => goToLogin()} />
    </div>
  )
}

export default Detail
