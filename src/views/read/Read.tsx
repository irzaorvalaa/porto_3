import * as React from 'react'
import { Collapse, Alert, IconButton, AlertTitle, Snackbar, Breadcrumbs } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'
import { useSnackbar } from 'notistack'
import { NavLink, useParams } from 'react-router-dom'
import { ICollectionDetail } from '../../interfaces/ICollection'
import { initialCollectionDetailState } from '../../constants/CollectionState'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchCollection } from './utilities'
import './Read.scss'

const Read = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const { collectionID } = useParams()

  // State
  const { reducer } = useLocalState<ICollectionDetail | null>()
  const [state, dispatch] = React.useReducer(reducer, initialCollectionDetailState)
  const [alertStatus, setAlertStatus] = React.useState(true)

  const [openSnackBar, setOpenSnackBar] = React.useState(false)
  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  const getUrl = React.useMemo<string>(
    () =>
      'https://drive.google.com/viewerng/viewer?embedded=true&url=' +
      encodeURIComponent(state.data ? state.data.attachedFile : ''),
    [state],
  )

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

  React.useEffect(() => {
    ;(async () => {
      await fetchDataCollection()
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="read">
      <div className="read__container">
        <Breadcrumbs separator="›" className="read__breadcrumb">
          <NavLink to="/" className="read__breadcrumblink">
            Home
          </NavLink>
          <NavLink
            to={`/collection/${state.data?.collectionTypeID}`}
            className="read__breadcrumblink"
          >
            {state.data?.collectionType}
          </NavLink>
          <NavLink to={`/detail/${collectionID}`} className="read__breadcrumblink--current">
            {state.data?.title}
          </NavLink>
        </Breadcrumbs>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={1000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
          Copied!
        </Alert>
      </Snackbar>
      {state.data && state.data.ltiLaunchUrl ? (
        <Collapse in={alertStatus}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertStatus(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Please use this account to continue</AlertTitle>
            User ID: {state.data.sharedUsername}
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(state.data ? state.data.sharedUsername : '')
                setOpenSnackBar(true)
              }}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
            <br />
            Password: ********
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(state.data ? state.data.sharedPassword : '')
                setOpenSnackBar(true)
              }}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
            <br />
          </Alert>
        </Collapse>
      ) : (
        ''
      )}
      {state.data && state.data.ltiLaunchUrl ? (
        <iframe src={state.data.ltiLaunchUrl} className="read__iframe" />
      ) : (
        <embed src={getUrl} className="read__embed" />
      )}
    </div>
  )
}

export default Read
