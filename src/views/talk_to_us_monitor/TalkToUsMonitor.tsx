import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import moment from 'moment'
import { Button, IconButton, Tooltip, Typography, Alert, Snackbar, Breadcrumbs } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'
import { talkToUsOpen } from '../../redux/actions/TalkToUs.actions'
import { useAppDispatch, useAppSelector } from '../../helpers'
import { useLocalState } from '../../helpers/useLocalState'
import { initialStateTalkToUs, initialStateTalkToUsConfirm } from './constants'
import { fetchTalkToUs, confirmTalkToUs } from './utilities'
import { useSnackbar } from 'notistack'
import { FORMAT_DATE_EVENT_HEADLINE, PAGE_SIZE, ROWS_PER_PAGE } from '../../constants/Parameter'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IDialogTalkToUsConfirm, ITalkToUs, ITalkToUsConfirm } from './interfaces'
import DialogForm from '../../components/dialog_form'
import { deletedSuccessMessage, savedSuccessMessage } from '../../constants/SuccessMessage'
import './TalkToUsMonitor.scss'
import { IAuthFEState } from '../../interfaces/IAuth'
import DetailLoginAlert from '../detail/components/detail_login_alert'

const TalkToUsMonitor = () => {
  // Redux
  const auth: IAuthFEState = useAppSelector((state) => state.auth)
  const { enqueueSnackbar } = useSnackbar()
  const generalDispatch = useAppDispatch()
  const controller = new AbortController()

  if (!auth.isLoggedIn) window.location.replace('/')

  const handleTalkToUsOpen = () => {
    if (auth.isLoggedIn) generalDispatch(talkToUsOpen())
    else setOpenLoginAlert(true)
  }

  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateTalkToUs)
  const [confirmState, confirmDispatch] = React.useReducer(reducer, initialStateTalkToUsConfirm)
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [isOpen, setIsOpen] = React.useState<IDialogTalkToUsConfirm>({ confirm: false, reject: false })
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [openLoginAlert, setOpenLoginAlert] = React.useState<boolean>(false)
  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const goToLogin = () => window.location.replace('/login')

  const fetchData = async () => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchTalkToUs(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }

  const doConfirm = async (values: ITalkToUsConfirm, confirmType: string) => {
    try {
      confirmDispatch({ type: 'request' })

      const response = await confirmTalkToUs(
        values,
        controller.signal,
      )
      const { status, message } = response.data

      if (!status) throw message

      confirmDispatch({ type: 'success', data: null })

      enqueueSnackbar(savedSuccessMessage, {
        variant: 'success',
      })

      closeDialog(confirmType)

      await fetchData()
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      confirmDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const openDialog = (dialog: string) => setIsOpen((prev) => ({ ...prev, [dialog]: true }))
  const closeDialog = (dialog: string) => {
    setIsOpen((prev) => ({ ...prev, [dialog]: false }))
    confirmDispatch({ type: 'success', data: null })
  }

  const onConfirm = (row: ITalkToUs, confirmType: string) => {
    const newValue: ITalkToUsConfirm = {
      FormID: row.id,
      RequestorStatusID: confirmType
    }
    confirmDispatch({ type: 'success', data: newValue })
    openDialog(confirmType == '2' ? 'confirm' : 'reject')
  }

  const columns: GridColDef[] = [
    {
      field: 'appointmentDate',
      headerName: 'Appoinment Date',
      minWidth: 150,
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
        return (
          moment(params.row.appointmentDate).format(FORMAT_DATE_EVENT_HEADLINE)
        )
      },
    },
    { field: 'timeSlot', headerName: 'Time Slot', flex: 1, minWidth: 100, },
    { field: 'campus', headerName: 'Campus Location', flex: 3, minWidth: 200, },
    { field: 'referenceTopicName', headerName: 'Topic', flex: 3, minWidth: 200, },
    {
      field: 'meetingUrl',
      headerName: 'Meeting Url',
      flex: 3,
      minWidth: 200,
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
        return (
          <div>
            { params.row.meetingUrl != "" && params.row.meetingUrl != null && (
              <Tooltip title="Copy Meeting Url" arrow disableInteractive>
                <IconButton 
                  onClick={() => {
                    navigator.clipboard.writeText(params.row.meetingUrl)
                    setOpenSnackBar(true)
                  }}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            )}
            { params.row.meetingUrl != "" && params.row.meetingUrl != null ? params.row.meetingUrl : '-' }
          </div>
        )
      },
    },
    { field: 'appointmentStatusDesc', headerName: 'Status', flex: 1, minWidth: 150, },
    {
      field: 'action',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
        return (
          <div>
            { params.row.requestorStatus == "1" && (
              <Tooltip title="Confirm" arrow disableInteractive>
                <IconButton onClick={() => onConfirm?.(params.row, '2')}>
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
            )}
            { (params.row.requestorStatus == "1" || (params.row.requestorStatus == "2" && params.row.appointmentStatus == "1")) && (
              <Tooltip title="Cancel" arrow disableInteractive>
                <IconButton onClick={() => onConfirm?.(params.row, '3')}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )
      },
    },
  ]

  React.useEffect(() => {
    if(auth.isLoggedIn) fetchData()

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
          <NavLink to="/talk_to_us" className="detail__breadcrumblink--current">
            Talk To Us
          </NavLink>
        </Breadcrumbs>
        
          <Button
            variant="contained"
            color="secondary"
            className="button button--secondary btn-add"
            onClick={handleTalkToUsOpen}
          >
            Create Appointment
          </Button>
          <DataGrid
            rows={state.data}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(value) => setPageSize(value)}
            loading={state.isLoading}
            autoHeight
            rowsPerPageOptions={ROWS_PER_PAGE}
          />
          <DialogForm
            open={isOpen.confirm || isOpen.reject}
            title={ isOpen.confirm ? 'Confirm' : 'Cancel' }
            size="xs"
            labelConfirmButton={ isOpen.confirm ? 'Confirm' : 'Cancel' }
            type={ isOpen.confirm ? 'add' : 'delete' }
            onClose={() => closeDialog(isOpen.confirm ? 'confirm' : 'reject')}
            onCancel={() => closeDialog(isOpen.confirm ? 'confirm' : 'reject')}
            onConfirm={() => doConfirm(confirmState.data, (isOpen.confirm ? 'confirm' : 'reject'))}
          >
            <div>
              <Typography variant="body1">{(isOpen.confirm ? 'Confirm' : 'Cancel')} this Appoinment?</Typography>
            </div>
          </DialogForm>
          <Snackbar open={openSnackBar} autoHideDuration={1000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
              Meeting Url Copied!
            </Alert>
          </Snackbar>
          <DetailLoginAlert open={openLoginAlert} onClose={() => setOpenLoginAlert(false)} onConfirm={() => goToLogin()} />
        
      </div>
    </div>
  )
}

export default TalkToUsMonitor

