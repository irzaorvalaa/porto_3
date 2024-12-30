import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IBECampus } from '../../../interfaces/ICampus'
import { ICampusFormData, ICampusOpenCallback } from './components/campus_form/interfaces'
import { initialStateCampus, initialStateCampusForm } from './constants'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { getCampus, getCampusDetail, saveCampus } from './utilities'
import './Campus.scss'

// Components
import HeroPage from '../../../components/hero_page'
import CampusDatagrid from './components/campus_datagrid'
import CampusForm from './components/campus_form'
import CampusDelete from './components/campus_delete'
import { IUserManagementLookupMemberCallback } from '../../setting/user_management/interfaces'
import { fetchLookupUserByBinusian } from '../../setting/user_management/utilities'

const Campus = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState<IBECampus[]>()
  const { reducer: formReducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateCampus)
  const [formState, formDispatch] = React.useReducer(formReducer, initialStateCampusForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({
    form: false,
    delete: false,
  })

  const fetchData = async () => {
    try {
      dispatch({ type: 'request' })

      const response = await getCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: ICampusFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveCampus(values as ICampusFormData, controller.signal)

      const { status, message } = response.data

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

  const handleLookupBinusian = async (keyword: string, cb: IUserManagementLookupMemberCallback) => {
    try {
      if (keyword != '') {
        const response = await fetchLookupUserByBinusian(keyword, controller.signal)

        const { data, status, message } = response.data

        if (!status) throw message

        if (!data?.binusianID) throw 'Binusian not found'

        cb(data)
      }
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      cb(null, errorMessage)
    }
  }

  const onEdit = (value: IBECampus) => {
    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IBECampus) => {
    formDispatch({ type: 'success', data: value })
    openDialog('delete')
  }

  const onDeleteBulk = (values: GridSelectionModel) => {
    console.group('CampusLocation - onDeleteBulk')
    console.table(values)
    console.groupEnd()
  }

  const openDialog = (dialog: DialogType) => setIsOpen((prev) => ({ ...prev, [dialog]: true }))
  const closeDialog = (dialog: DialogType) => {
    setIsOpen((prev) => ({ ...prev, [dialog]: false }))
    formDispatch({ type: 'success', data: null })
  }

  const handleFormOpen = async (campus: IBECampus, cb: ICampusOpenCallback) => {
    try {
      const response = await getCampusDetail(campus.id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      cb(data)
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  React.useEffect(() => {
    fetchData()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Campus" />
      <CampusDatagrid
        loading={state.isLoading}
        rows={state.data as IBECampus[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <CampusForm
        open={isOpen.form}
        defaultValue={formState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        onClose={() => closeDialog('form')}
        onOpen={handleFormOpen}
        onConfirm={onSave}
        onLookupBinusian={handleLookupBinusian}
      />
      <CampusDelete
        open={isOpen.delete}
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default Campus
