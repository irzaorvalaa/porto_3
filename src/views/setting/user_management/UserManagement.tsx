import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IUserManagementFilter } from './components/filter/interfaces'
import { IUserManagementFormData } from './components/form/interfaces'
import {
  initialStateUserManagement,
  initialStateUserManagementForm,
  initialStateUserManagementDetail,
  initialStateCampus,
  initialStateAcademicProgram,
  initialStateRole,
  initialStateLookupBinusian,
} from './constants'
import {
  fetchUserManagement,
  fetchUserManagementDetail,
  saveUserManagement,
  fetchMasterCampus,
  fetchAcademicProgram,
  fetchMasterRole,
  fetchLookupMemberByBinusian,
} from './utilities'
import { IUserManagement, IUserManagementLookupMemberCallback } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './UserManagement.scss'

// Components
import HeroPage from '../../../components/hero_page'
import UserManagementDatagrid from './components/datagrid'
import UserManagementForm from './components/form'
import UserManagementDelete from './components/delete'
import UserManagementFilter from './components/filter'

const UserManagement = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateUserManagement)
  const [activeFilter, setActiveFilter] = React.useState<IUserManagementFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateUserManagementDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [academicProgramState, academicProgramDispatch] = React.useReducer(
    reducer,
    initialStateAcademicProgram,
  )
  const [roleState, roleDispatch] = React.useReducer(reducer, initialStateRole)
  const [lookupBinusian, lookupBinusianDispatch] = React.useReducer(
    reducer,
    initialStateLookupBinusian,
  )
  const [formState, formDispatch] = React.useReducer(reducer, initialStateUserManagementForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IUserManagementFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchUserManagement(controller.signal, filter)

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

      const response = await fetchUserManagementDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IUserManagementFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveUserManagement(
        values as IUserManagementFormData,
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

  const getAcademicProgram = async () => {
    try {
      academicProgramDispatch({ type: 'request' })

      const response = await fetchAcademicProgram(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      academicProgramDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      academicProgramDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const getRole = async () => {
    try {
      roleDispatch({ type: 'request' })

      const response = await fetchMasterRole(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      roleDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      roleDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const handleLookupBinusian = async (keyword: string, cb: IUserManagementLookupMemberCallback) => {
    try {
      if (keyword != '') {
        const response = await fetchLookupMemberByBinusian(keyword, controller.signal)

        const { data, status, message } = response.data

        if (!status) throw message

        // if (!data?.binusianID) throw 'Binusian not found'

        cb(data)
      }
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      cb(null, errorMessage)
    }
  }

  const onShow = (filter: IUserManagementFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IUserManagement) => {
    if (campusState.data.length === 0) await getCampus()
    if (academicProgramState.data.length === 0) await getAcademicProgram()
    if (roleState.data.length === 0) await getRole()

    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IUserManagement) => {
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
    getAcademicProgram()
    getRole()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Master User" />
      <UserManagementFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        academicProgramOptions={academicProgramState.data}
        roleOptions={roleState.data}
        onShow={onShow}
      />
      <UserManagementDatagrid
        loading={state.isLoading}
        rows={state.data as IUserManagement[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <UserManagementForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        academicProgramOptions={academicProgramState.data}
        roleOptions={roleState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
        onLookupBinusian={handleLookupBinusian}
      />
      <UserManagementDelete
        open={isOpen.delete}
        title="Delete User"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default UserManagement
