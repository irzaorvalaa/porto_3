import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { ICalendarFilter } from './components/filter/interfaces'
import { ICalendarFormData } from './components/form/interfaces'
import {
  initialStateCalendar,
  initialStateCalendarForm,
  initialStateCalendarDetail,

  initialStateCampus,
} from './constants'
import {
  fetchCalendar,
  fetchCalendarDetail,
  saveCalendar,
  fetchMasterCampus,
} from './utilities'
import { ICalendar } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './Calendar.scss'

// Components
import HeroPage from '../../../components/hero_page'
import CalendarDatagrid from './components/datagrid'
import CalendarForm from './components/form'
import CalendarDelete from './components/delete'
import CalendarFilter from './components/filter'

const Calendar = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateCalendar)
  const [activeFilter, setActiveFilter] = React.useState<ICalendarFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateCalendarDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateCalendarForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: ICalendarFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchCalendar(controller.signal, filter)

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

      const response = await fetchCalendarDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: ICalendarFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveCalendar(values as ICalendarFormData, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      formDispatch({ type: 'success', data: null })

      enqueueSnackbar(dialog === 'form' ? savedSuccessMessage : deletedSuccessMessage, {
        variant: 'success',
      })

      closeDialog(dialog)

      await fetchData()
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

  const onShow = (filter: ICalendarFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: ICalendar) => {
    if (campusState.data.length === 0) await getCampus()
    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: ICalendar) => {
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
    fetchData()
    getCampus()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Off Day" />
      <CalendarFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        onShow={onShow}
      />
      <CalendarDatagrid
        loading={state.isLoading}
        rows={state.data as ICalendar[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <CalendarForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <CalendarDelete
        open={isOpen.delete}
        title="Delete Calendar"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default Calendar
