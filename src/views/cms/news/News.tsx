import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { INewsFilter } from './components/filter/interfaces'
import { INewsFormData } from './components/form/interfaces'
import {
  initialStateNews,
  initialStateNewsForm,
  initialStateNewsDetail,

  initialStateCampus,
} from './constants'
import {
  fetchNews,
  fetchNewsDetail,
  saveNews,
  fetchMasterCampus,
} from './utilities'
import { INews } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './News.scss'

// Components
import HeroPage from '../../../components/hero_page'
import NewsDatagrid from './components/datagrid'
import NewsForm from './components/form'
import NewsDelete from './components/delete'
import NewsFilter from './components/filter'
import { arrNewsCategory } from './components/form/constants'

const News = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateNews)
  const [activeFilter, setActiveFilter] = React.useState<INewsFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateNewsDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateNewsForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: INewsFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchNews(controller.signal, filter)

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

      const response = await fetchNewsDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: INewsFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveNews(values as INewsFormData, controller.signal)

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

  const onShow = (filter: INewsFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: INews) => {
    if (campusState.data.length === 0) await getCampus()
    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: INews) => {
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
      <HeroPage title="News &amp; Event" />
      <NewsFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        onShow={onShow}
      />
      <NewsDatagrid
        loading={state.isLoading}
        rows={state.data as INews[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <NewsForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        categoryOptions={arrNewsCategory}
        campusOptions={campusState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <NewsDelete
        open={isOpen.delete}
        title="Delete News"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default News
