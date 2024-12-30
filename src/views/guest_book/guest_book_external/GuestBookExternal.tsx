import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IGuestBookExternalFilter } from './components/filter/interfaces'
import { IGuestBookExternalFormData } from './components/form/interfaces'

import {
  initialStateGuestBookExternal,
  initialStateGuestBookExternalForm,
  initialStateGuestBookExternalDetail,

  initialStateCampus,
} from './constants'
import {
  fetchGuestBookExternal,
  fetchGuestBookExternalDetail,
  saveGuestBookExternal,
  fetchMasterCampus,
} from './utilities'
import { IGuestBookExternal } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './GuestBookExternal.scss'

// Components
import HeroPage from '../../../components/hero_page'
import GuestBookExternalDatagrid from './components/datagrid'
import GuestBookExternalForm from './components/form'
import GuestBookExternalDelete from './components/delete'
import GuestBookExternalFilter from './components/filter'
import { arrIdentity } from './components/form/constants'
import moment from 'moment'
import { FORMAT_DATE_POST } from '../../../constants/Parameter'

const GuestBookExternal = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateGuestBookExternal)
  const [activeFilter, setActiveFilter] = React.useState<IGuestBookExternalFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateGuestBookExternalDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateGuestBookExternalForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IGuestBookExternalFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchGuestBookExternal(controller.signal, filter)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDetail = async (id: string) => {
    try {
      detailDispatch({ type: 'request' })

      const response = await fetchGuestBookExternalDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IGuestBookExternalFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveGuestBookExternal(values as IGuestBookExternalFormData, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      formDispatch({ type: 'success', data: null })

      enqueueSnackbar(dialog === 'form' ? savedSuccessMessage : deletedSuccessMessage, {
        variant: 'success',
      })

      closeDialog(dialog)

      if (activeFilter.startDate == undefined && activeFilter.endDate == undefined) 
      {
        const filter : IGuestBookExternalFilter = {
          campusID : "",
          startDate : moment(startOfMonth).format(FORMAT_DATE_POST),
          endDate : moment(endOfMonth).format(FORMAT_DATE_POST),
        }
        onShow(filter)
        setActiveFilter(filter)
      }
      else onShow(activeFilter)

      
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      formDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const getCampus = async () => {
    try {
      campusDispatch({ type: 'request' })

      const response = await fetchMasterCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      campusDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      campusDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onShow = (filter: IGuestBookExternalFilter) => {
    if (filter.startDate == '') filter.startDate = moment(startOfMonth).format(FORMAT_DATE_POST)
    if (filter.endDate == '') filter.endDate = moment(endOfMonth).format(FORMAT_DATE_POST)

    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IGuestBookExternal) => {
    if (campusState.data.length === 0) await getCampus()

    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IGuestBookExternal) => {
    formDispatch({ type: 'success', data: value })
    openDialog('delete')
  }

  const onDeleteBulk = (values: GridSelectionModel) => {
    console.group('MasterForm - onDeleteBulk')
    console.table(values)
    console.groupEnd()
  }

  const openDialog = (dialog: DialogType) => setIsOpen((prev) => ({ ...prev, [dialog]: true }))
  const closeDialog = (dialog: DialogType) => {
    setIsOpen((prev) => ({ ...prev, [dialog]: false }))
    formDispatch({ type: 'success', data: null })
    detailDispatch({ type: 'success', data: null })
  }

  React.useEffect(() => {
    // fetchData()
    getCampus()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Guestbook for External" />
      <GuestBookExternalFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        onShow={onShow}
      />
      <GuestBookExternalDatagrid
        loading={state.isLoading}
        rows={state.data as IGuestBookExternal[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <GuestBookExternalForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        identityOptions={arrIdentity}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <GuestBookExternalDelete
        open={isOpen.delete}
        title="Delete Guestbook"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default GuestBookExternal
