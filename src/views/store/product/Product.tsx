import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IProductFilter } from './components/product_filter/interfaces'
import { IProductFormData, IProductFormOpenCallback } from './components/product_form/interfaces'
import {
  initialStateProduct,
  initialStateProductForm,
  initialStateFetchOptions,
  initialStateProductDDC,
  initialStateProductPublisher,
  initialStateProductDetail,
} from './constants'
import { IGeneralFetch } from '../../../interfaces/IGeneralFetch'
import { IProduct, IProductDDC, IProductDetail, IProductPublisher } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import {
  fetchCampus,
  fetchCollectionBookType,
  fetchCollectionSubject,
  fetchCollectionType,
  fetchSupplement,
  getCollection,
  getDDC,
  getDetailCollection,
  getPublisher,
  saveCollection,
} from './utilities'
import './Product.scss'

// Components
import HeroPage from '../../../components/hero_page'
import ProductDatagrid from './components/product_datagrid'
import ProductForm from './components/product_form'
import ProductDelete from './components/product_delete'
import ProductFilter from './components/product_filter'

const Product = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer: collectionReducer } = useLocalState<IProduct[]>()
  const { reducer: formReducer } = useLocalState<IProduct | null>()
  const { reducer: fetchReducer } = useLocalState<IGeneralFetch[]>()
  const { reducer: DDCReducer } = useLocalState<IProductDDC[]>()
  const { reducer: publisherReducer } = useLocalState<IProductPublisher[]>()
  const { reducer: detailReducer } = useLocalState<IProductDetail | null>()
  const [collectionState, collectionDispatch] = React.useReducer(
    collectionReducer,
    initialStateProduct,
  )
  const [formState, formDispatch] = React.useReducer(formReducer, initialStateProductForm)
  const [collectionTypeState, collectionTypeDispatch] = React.useReducer(
    fetchReducer,
    initialStateFetchOptions,
  )
  const [DDCState, DDCDispatch] = React.useReducer(DDCReducer, initialStateProductDDC)
  const [publisherState, publisherDispatch] = React.useReducer(
    publisherReducer,
    initialStateProductPublisher,
  )
  const [supplementState, supplementDispatch] = React.useReducer(
    fetchReducer,
    initialStateFetchOptions,
  )
  const [collectionSubjectState, collectionSubjectDispatch] = React.useReducer(
    fetchReducer,
    initialStateFetchOptions,
  )
  const [campusState, campusDispatch] = React.useReducer(fetchReducer, initialStateFetchOptions)
  const [bookTypeState, bookTypeDispatch] = React.useReducer(fetchReducer, initialStateFetchOptions)
  const [detailState, detailDispatch] = React.useReducer(detailReducer, initialStateProductDetail)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({
    form: false,
    delete: false,
  })
  const [activeFilter, setActiveFilter] = React.useState<IProductFilter>({})

  const fetchDataCollection = async (filter?: IProductFilter) => {
    try {
      collectionDispatch({ type: 'request' })

      const response = await getCollection(controller.signal, filter)

      const { data, status, message } = response.data

      if (!status) throw message

      collectionDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      collectionDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDataCollectionDetail = async (collectionID: string) => {
    try {
      detailDispatch({ type: 'request' })

      const response = await getDetailCollection(collectionID, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataCollectionType = async () => {
    try {
      collectionTypeDispatch({ type: 'request' })

      const response = await fetchCollectionType(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      collectionTypeDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      collectionTypeDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDataDDC = async () => {
    try {
      DDCDispatch({ type: 'request' })

      const response = await getDDC(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      DDCDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      DDCDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataPublisher = async () => {
    try {
      publisherDispatch({ type: 'request' })

      const response = await getPublisher(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      publisherDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      publisherDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataSupplement = async () => {
    try {
      supplementDispatch({ type: 'request' })

      const response = await fetchSupplement(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      supplementDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      supplementDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataCollectionSubject = async () => {
    try {
      collectionSubjectDispatch({ type: 'request' })

      const response = await fetchCollectionSubject(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      collectionSubjectDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      collectionSubjectDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataCampus = async () => {
    try {
      campusDispatch({ type: 'request' })

      const response = await fetchCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      campusDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      campusDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataCollectionBookType = async () => {
    try {
      bookTypeDispatch({ type: 'request' })

      const response = await fetchCollectionBookType(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      bookTypeDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      bookTypeDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const onSave = async (values: IProductFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveCollection(values, controller.signal)

      const { status, message } = response.data

      if (!status) throw message

      formDispatch({ type: 'success', data: null })
      detailDispatch({ type: 'success', data: null })

      enqueueSnackbar(dialog === 'form' ? savedSuccessMessage : deletedSuccessMessage, {
        variant: 'success',
      })

      closeDialog(dialog)

      await fetchDataCollection(activeFilter)
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      formDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onEdit = (value: IProduct) => {
    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IProduct) => {
    formDispatch({ type: 'success', data: value })
    openDialog('delete')
  }

  const onDeleteBulk = (values: GridSelectionModel) => {
    console.group('CollectionManagement - onDeleteBulk')
    console.table(values)
    console.groupEnd()
  }

  const onShow = (filter: IProductFilter) => {
    setActiveFilter(filter)
    fetchDataCollection(filter)
  }

  const openDialog = (dialog: DialogType) => setIsOpen((prev) => ({ ...prev, [dialog]: true }))
  const closeDialog = (dialog: DialogType) => {
    setIsOpen((prev) => ({ ...prev, [dialog]: false }))
    formDispatch({ type: 'success', data: null })
  }

  const handleOnOpenForm = async (collection: IProduct | null, cb: IProductFormOpenCallback) => {
    try {
      const [
        DDCData,
        publisherData,
        supplementData,
        collectionSubjectData,
        campusData,
        bookTypeData,
        collectionData,
      ] = await Promise.all([
        DDCState.data?.length === 0 ? fetchDataDDC() : DDCState.data ?? [],
        publisherState.data?.length === 0 ? fetchDataPublisher() : publisherState.data ?? [],
        supplementState.data?.length === 0 ? fetchDataSupplement() : supplementState.data ?? [],
        collectionSubjectState.data?.length === 0
          ? fetchDataCollectionSubject()
          : collectionSubjectState.data ?? [],
        campusState.data?.length === 0 ? fetchDataCampus() : campusState.data ?? [],
        bookTypeState.data?.length === 0 ? fetchDataCollectionBookType() : bookTypeState.data ?? [],
        collection && detailState.data?.id !== collection.id
          ? fetchDataCollectionDetail(collection.id)
          : detailState.data ?? null,
      ])
      cb(
        DDCData,
        publisherData,
        supplementData,
        collectionSubjectData,
        campusData,
        bookTypeData,
        collectionData,
      )
    } catch (err) {
      const errorMessage = err as string

      cb(null, null, null, null, null, null, null, errorMessage)
    }
  }

  React.useEffect(() => {
    fetchDataCollectionType()
    fetchDataCollection()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Product" />
      <ProductFilter
        loading={collectionState.isLoading || collectionTypeState.isLoading}
        collectionTypeOptions={collectionTypeState.data}
        onShow={onShow}
      />
      <ProductDatagrid
        loading={collectionState.isLoading}
        rows={collectionState.data as IProduct[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <ProductForm
        open={isOpen.form}
        defaultValue={formState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        collectionTypeOptions={collectionTypeState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
        onOpen={handleOnOpenForm}
      />
      <ProductDelete
        open={isOpen.delete}
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default Product
