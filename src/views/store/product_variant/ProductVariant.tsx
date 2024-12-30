import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IProductVariantFilter } from './components/filter/interfaces'
import { IProductVariantFormData } from './components/form/interfaces'
import {
  initialStateProductVariant,
  initialStateProductVariantForm,
  initialStateProductVariantDetail,
} from './constants'
import { fetchProductVariant, fetchProductVariantDetail, saveProductVariant } from './utilities'
import { IProductVariant } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './ProductVariant.scss'

// Components
import HeroPage from '../../../components/hero_page'
import ProductVariantDatagrid from './components/datagrid'
import ProductVariantForm from './components/form'
import ProductVariantDelete from './components/delete'
import ProductVariantFilter from './components/filter'
import { arrFormDigitalType } from './components/form/constants'

const ProductVariant = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateProductVariant)
  const [activeFilter, setActiveFilter] = React.useState<IProductVariantFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateProductVariantDetail)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateProductVariantForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IProductVariantFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchProductVariant(controller.signal, filter)

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

      const response = await fetchProductVariantDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IProductVariantFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveProductVariant(
        values as IProductVariantFormData,
        controller.signal,
      )

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

  const onShow = (filter: IProductVariantFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IProductVariant) => {
    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IProductVariant) => {
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

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Collection Type" />
      {/* <ProductVariantFilter
        loading={state.isLoading}
        onShow={onShow}
      /> */}
      <ProductVariantDatagrid
        loading={state.isLoading}
        rows={state.data as IProductVariant[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <ProductVariantForm
        open={isOpen.form}
        defaultValue={detailState.data}
        typeOptions={arrFormDigitalType}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <ProductVariantDelete
        open={isOpen.delete}
        title="Delete Type"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default ProductVariant
