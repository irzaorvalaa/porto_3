import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IMappingProductFilter } from './components/filter/interfaces'
import { IMappingProductFormData } from './components/form/interfaces'

import {
  initialStateMappingProduct,
  initialStateMappingProductForm,
  initialStateMappingProductDetail,
  initialStateCampus,
} from './constants'
import {
  fetchMappingProduct,
  fetchMappingProductDetail,
  saveMappingProduct,
  fetchMasterCampus,
} from './utilities'
import { IMappingProduct } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './MappingProduct.scss'

// Components
import HeroPage from '../../../components/hero_page'
import MappingProductDatagrid from './components/datagrid'
import MappingProductForm from './components/form'
import MappingProductDelete from './components/delete'
import MappingProductFilter from './components/filter'
import { allDayName } from './components/form/constants'

const MappingProduct = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateMappingProduct)
  const [activeFilter, setActiveFilter] = React.useState<IMappingProductFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateMappingProductDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateMappingProductForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IMappingProductFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchMappingProduct(controller.signal, filter)

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

      const response = await fetchMappingProductDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IMappingProductFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveMappingProduct(
        values as IMappingProductFormData,
        controller.signal,
      )

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

  const onShow = (filter: IMappingProductFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IMappingProduct) => {
    if (campusState.data.length === 0) await getCampus()

    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IMappingProduct) => {
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
      <HeroPage title="Schedule" />
      <MappingProductFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        onShow={onShow}
      />
      <MappingProductDatagrid
        loading={state.isLoading}
        rows={state.data as IMappingProduct[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <MappingProductForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        dayOptions={allDayName}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <MappingProductDelete
        open={isOpen.delete}
        title="Delete Schedule"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default MappingProduct
