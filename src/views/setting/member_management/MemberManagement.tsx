import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useLocalState } from '../../../helpers/useLocalState'
import { IMemberManagementFilter } from './components/filter/interfaces'
import { IMemberManagementFormData } from './components/form/interfaces'
import {
  initialStateMemberManagement,
  initialStateMemberManagementForm,
  initialStateMemberManagementDetail,

  initialStateCampus,
  initialStateAcademicProgram,
  initialStateAcademicOrganization,
  initialStateAcademicGroup,
} from './constants'
import {
  fetchMemberManagement,
  fetchMemberManagementDetail,
  saveMemberManagement,
  fetchMasterCampus,
  fetchAcademicProgram,
  fetchAcademicOrganization,
  fetchAcademicGroup,
} from './utilities'
import { IMemberManagement } from './interfaces'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import './MemberManagement.scss'

// Components
import HeroPage from '../../../components/hero_page'
import MemberManagementDatagrid from './components/datagrid'
import MemberManagementForm from './components/form'
// import MemberManagementDelete from './components/master_user_delete'
import MemberManagementFilter from './components/filter'

const MemberManagement = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateMemberManagement)
  const [activeFilter, setActiveFilter] = React.useState<IMemberManagementFilter>({})
  const [detailState, detailDispatch] = React.useReducer(reducer, initialStateMemberManagementDetail)
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [academicGroupState, academicGroupDispatch] = React.useReducer(reducer, initialStateAcademicGroup)
  const [academicOrganizationState, academicOrganizationDispatch] = React.useReducer(reducer, initialStateAcademicOrganization)
  const [academicProgramState, academicProgramDispatch] = React.useReducer(reducer, initialStateAcademicProgram)
  const [formState, formDispatch] = React.useReducer(reducer, initialStateMemberManagementForm)
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({ form: false, delete: false })

  const fetchData = async (filter?: IMemberManagementFilter) => {
    try {
      dispatch({ type: 'request' })

      const response = await fetchMemberManagement(controller.signal, filter)

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

      const response = await fetchMemberManagementDetail(id, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      detailDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      detailDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onSave = async (values?: IMemberManagementFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveMemberManagement(values as IMemberManagementFormData, controller.signal)

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

  const getAcademicOrganization = async () => {
    try {
      academicOrganizationDispatch({ type: 'request' })

      const response = await fetchAcademicOrganization(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      academicOrganizationDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      academicOrganizationDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const getAcademicGroup = async () => {
    try {
      academicGroupDispatch({ type: 'request' })

      const response = await fetchAcademicGroup(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      academicGroupDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      academicGroupDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const onShow = (filter: IMemberManagementFilter) => {
    setActiveFilter(filter)
    fetchData(filter)
  }

  const onEdit = async (value: IMemberManagement) => {
    if (campusState.data.length === 0) await getCampus()
    if (academicProgramState.data.length === 0) await getAcademicProgram()
    if (academicOrganizationState.data.length === 0) await getAcademicOrganization()
    if (academicGroupState.data.length === 0) await getAcademicGroup()

    await fetchDetail(value?.id as string)

    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  const onDelete = (value: IMemberManagement) => {
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
    const filter : IMemberManagementFilter = {
      showUser:'1'
    }
    setActiveFilter(filter)

    fetchData(filter)
    getCampus()
    getAcademicProgram()
    getAcademicOrganization()
    getAcademicGroup()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Member Management" />
      <MemberManagementFilter
        loading={state.isLoading}
        campusOptions={campusState.data}
        academicProgramOptions={academicProgramState.data}
        academicOrganizationOptions={academicOrganizationState.data}
        academicGroupOptions={academicGroupState.data}
        onShow={onShow}
      />
      <MemberManagementDatagrid
        loading={state.isLoading}
        rows={state.data as IMemberManagement[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <MemberManagementForm
        open={isOpen.form}
        defaultValue={detailState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        campusOptions={campusState.data}
        academicProgramOptions={academicProgramState.data}
        academicOrganizationOptions={academicOrganizationState.data}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
      />
    </React.Fragment>
  )
}

export default MemberManagement
