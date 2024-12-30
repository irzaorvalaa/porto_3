import * as React from 'react'
import { useSnackbar } from 'notistack'
import { useLocalState } from '../../helpers/useLocalState'
import { savedSuccessMessage } from '../../constants/SuccessMessage'
import {
  IGuestBookBinusianFormData,
  IGuestBookLookupMemberCallback,
} from './components/guest_book_binusian_form/interfaces'
import { IGeneralFetch } from '../../interfaces/IGeneralFetch'
import {
  initialStateCampusOptions,
  initialStateGuestBookBinusianCampus,
  initialStateGuestBookBinusianForm,
} from './constants'
import { IGuestBookMember } from './interfaces'
import { fetchCampus, lookupMemberCode, saveGuestBook } from './utilities'
import './GuestBookBinusian.scss'

// Components
import GuestBookBinusianForm from './components/guest_book_binusian_form'
import GuestBookBinusianCampusForm from './components/guest_book_binusian_campus_form'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { IBECampus, ICampusDetail } from '../../interfaces/ICampus'

const GuestBookBinusian = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer: formReducer } = useLocalState<IGuestBookMember | null>()
  const { reducer: campusReducer } = useLocalState<IBECampus | null>()
  const { reducer: campusOptionsReducer } = useLocalState<IBECampus[]>()
  const [formState, formDispatch] = React.useReducer(formReducer, initialStateGuestBookBinusianForm)
  const [campusState, campusDispatch] = React.useReducer(
    campusReducer,
    initialStateGuestBookBinusianCampus,
  )
  const [campusOptionsState, campusOptionsDispatch] = React.useReducer(
    campusOptionsReducer,
    initialStateCampusOptions,
  )
  const [open, setOpen] = React.useState<boolean>(false)
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [lockerBorrowing, setLockerBorrowing] = React.useState<boolean>(false)

  const fetchCampusOptions = React.useCallback(async () => {
    try {
      campusOptionsDispatch({ type: 'request' })

      const response = await fetchCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      campusOptionsDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      campusOptionsDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const handleLookupMember = async (memberCode: string, cb: IGuestBookLookupMemberCallback) => {
    try {
      console.log(campusState)
      if (campusState.data != null) {
        if (memberCode != '') {
          const response = await lookupMemberCode(memberCode, controller.signal)
  
          const { data, status, message } = response.data
  
          if (!status) throw message
  
          if (!data.id) throw 'Member not found'
  
          cb(data)
        }
      } else {
        setAlertOpen(true)
        setOpen(true)
      }
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      cb(null, errorMessage)
    }
  }

  const onSave = async (values: IGuestBookBinusianFormData) => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveGuestBook(values, controller.signal)

      const { status, message } = response.data

      if (!status) throw message

      formDispatch({ type: 'success', data: null })

      enqueueSnackbar(savedSuccessMessage, {
        variant: 'success',
      })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      formDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onCampusSave = (values: IBECampus) => {
    campusDispatch({ type: 'success', data: values })
    setLockerBorrowing(values.provideLockerBorrowing == 'T' ? true : false)
    setOpen(false)
  }

  React.useEffect(() => {
    ;(async () => {
      await fetchCampusOptions()
    })()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <GuestBookBinusianForm
        campus={campusState.data}
        loading={formState.isLoading}
        lockerBorrowing={lockerBorrowing}
        onConfirm={onSave}
        onSetting={() => setOpen(true)}
        onLookupMember={handleLookupMember}
      />
      <GuestBookBinusianCampusForm
        open={open}
        defaultValue={campusState.data}
        campusOptions={campusOptionsState.data}
        onClose={() => setOpen(false)}
        onConfirm={onCampusSave}
      />
      <Dialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select Campus to continue. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default GuestBookBinusian
