import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IAnnouncementFilter } from './components/filter/interfaces'
import { IAnnouncementFormData } from './components/form/interfaces'
import {
  initialStateAnnouncement,
  initialStateAnnouncementForm,
  initialStateAnnouncementDetail,

  initialStateCampus,
} from './constants'
import {
  fetchAnnouncement,
  fetchAnnouncementDetail,
  saveAnnouncement,
  fetchMasterCampus,
} from './utilities'
import { IAnnouncement } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './Announcement.scss'

// Components
import HeroPage from '../../../components/hero_page'
import AnnouncementDatagrid from './components/datagrid'
import AnnouncementForm from './components/form'
import AnnouncementDelete from './components/delete_announcement'
import AnnouncementFilter from './components/filter'

const Announcement = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateAnnouncement)
  const [activeFilter, setActiveFilter] = React.useState<IAnnouncementFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateAnnouncementDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateAnnouncementForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IAnnouncementFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchAnnouncement(controller.signal, filter)

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

      const response = await fetchAnnouncementDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IAnnouncementFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveAnnouncement(values as IAnnouncementFormData, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      formDispatch({ type: 'success', data: null })

      enqueueSnackbar(dialog === 'form' ? savedSuccessMessage : deletedSuccessMessage, {
        variant: 'success',
      })

      closeDialog(dialog)

      await fetchData(activeFilter)
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

  const onShow = (filter: IAnnouncementFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IAnnouncement) => {
    if (campusState.data.length === 0) await getCampus()
    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IAnnouncement) => {
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
      <HeroPage title="Announcement" />
      <AnnouncementFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        onShow={onShow}
      />
      <AnnouncementDatagrid
        loading={state.isLoading}
        rows={state.data as IAnnouncement[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <AnnouncementForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <AnnouncementDelete
        open={isOpen.delete}
        title="Delete Announcement"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default Announcement
