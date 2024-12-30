import * as React from 'react'
import { useSnackbar } from 'notistack'
import { useLocalState } from '../../../helpers/useLocalState'
import {
  initialStateRoleManagement,
  initialStateRoleManagementDetail,
  initialStateRoleManagementForm,
  initialStateRoleManagementMenu,
} from './constants'
import {
  fetchRoleManagementMenu,
  fetchRoleManagement,
  saveRoleManagement,
  fetchRoleManagementDetail,
} from './utilities'
import { IRoleManagementFormData } from './components/role_management_form/interfaces'
import { IRoleManagement } from './interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'

// Components
import HeroPage from '../../../components/hero_page'
import RoleManagementDatagrid from './components/role_management_datagrid'
import RoleManagementForm from './components/role_management_form'
import RoleManagementDelete from './components/role_management_delete'

const RoleManagement = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateRoleManagement)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateRoleManagementForm)
  const [menuState, menuDispatch] = React.useReducer(reducer, initialStateRoleManagementMenu)
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateRoleManagementDetail)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async () => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchRoleManagement(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      dispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      dispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchMenu = async () => {
    try {
      menuDispatch({ type: 'request' })

      const response = await fetchRoleManagementMenu(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      menuDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      menuDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDetail = async (id: string) => {
    try {
      detailDispatch({ type: 'request' })

      const response = await fetchRoleManagementDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IRoleManagementFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveRoleManagement(
        values as IRoleManagementFormData,
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

  const onAdd = async () => {
    if (menuState.data.length === 0) await fetchMenu()

    openDialog('form')
  }

  const onEdit = async (value?: IRoleManagement) => {
    if (menuState.data.length === 0) await fetchMenu()

    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value?: IRoleManagement) => {
    formDispatch({ type: 'success', data: value })
    openDialog('delete')
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
      <HeroPage title="Role Management" />
      <RoleManagementDatagrid
        loading={state.isLoading}
        rows={state.data}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <RoleManagementForm
        open={isOpen.form}
        listMenu={menuState.data}
        detail={detailState.data}
        defaultValue={formState.data}
        loading={formState.isLoading || menuState.isLoading || detailState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
      <RoleManagementDelete
        open={isOpen.delete}
        title="Delete Role"
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        onConfirm={(values) => onSave(values, 'delete')}
      />
    </React.Fragment>
  )
}

export default RoleManagement
