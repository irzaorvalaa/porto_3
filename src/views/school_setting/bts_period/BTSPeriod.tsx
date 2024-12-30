import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IBTSPeriodFilter } from './components/filter/interfaces'
import { IBTSPeriodFormData } from './components/form/interfaces'
import {
  initialStateBTSPeriod,
  initialStateBTSPeriodForm,
  initialStateBTSPeriodDetail,
  initialStateCampus,
} from './constants'
import { fetchBTSPeriod, fetchBTSPeriodDetail, saveBTSPeriod, fetchMasterCampus } from './utilities'
import { IBTSPeriod } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './BTSPeriod.scss'

// Components
import HeroPage from '../../../components/hero_page'
import BTSPeriodDatagrid from './components/datagrid'
import BTSPeriodForm from './components/form'
import BTSPeriodDelete from './components/delete'
import BTSPeriodFilter from './components/filter'

const BTSPeriod = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateBTSPeriod)
  const [activeFilter, setActiveFilter] = React.useState<IBTSPeriodFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateBTSPeriodDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateBTSPeriodForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IBTSPeriodFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchBTSPeriod(controller.signal, filter)

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

      const response = await fetchBTSPeriodDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IBTSPeriodFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveBTSPeriod(values as IBTSPeriodFormData, controller.signal)

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

  const onShow = (filter: IBTSPeriodFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IBTSPeriod) => {
    if (campusState.data.length === 0) await getCampus()
    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IBTSPeriod) => {
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
      <HeroPage title="Topic" />
      <BTSPeriodFilter loading={state.isLoading} campusOptions={campusState.data} onShow={onShow} />
      <BTSPeriodDatagrid
        loading={state.isLoading}
        rows={state.data as IBTSPeriod[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <BTSPeriodForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <BTSPeriodDelete
        open={isOpen.delete}
        title="Delete Topic"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default BTSPeriod
