import * as React from 'react'
import { useSnackbar } from 'notistack'
import { GridSelectionModel } from '@mui/x-data-grid'
import moment from 'moment'
import { useLocalState } from '../../../helpers/useLocalState'
import {
  initialStateFetchOptions,
  initialStateReferenceClinic,
  initialStateReferenceClinicDetail,
  initialStateReferenceClinicForm,
} from './constants'
import {
  IReferenceClinicFormData,
  IReferenceClinicFormOpenCallback,
} from './components/reference_clinic_form/interfaces'
import { IReferenceClinic, IReferenceClinicDetail } from './interfaces'
import { deletedSuccessMessage, savedSuccessMessage } from '../../../constants/SuccessMessage'
import { DialogType, IDialogTypeOpen } from '../../../components/dialog_form/interfaces'
import { IReferenceClinicFilter } from './components/reference_clinic_filter/interfaces'
import { IGeneralFetch } from '../../../interfaces/IGeneralFetch'
import {
  fetchCampus,
  fetchMeetingLink,
  fetchTopic,
  getDetailReferenceClinic,
  getReferenceClinic,
  getReferenceSchedule,
  saveReferenceClinic,
} from './utilities'
import './ReferenceClinic.scss'

// Components
import HeroPage from '../../../components/hero_page'
import ReferenceClinicDatagrid from './components/reference_clinic_datagrid/ReferenceClinicDatagrid'
import ReferenceClinicForm from './components/reference_clinic_form/ReferenceClinicForm'
// import ReferenceClinicDelete from './components/reference_clinic_delete/ReferenceClinicDelete'
import ReferenceClinicFilter from './components/reference_clinic_filter'
import { IUserManagementLookupMemberCallback } from '../../setting/user_management/interfaces'
import { fetchLookupUserByBinusian } from '../../setting/user_management/utilities'
import { IMasterMemberLookupMemberCallback } from '../../setting/member_management/interfaces'
import { fetchLookupMemberByMemberCode } from '../../setting/member_management/utilities'

const ReferenceClinic = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer: referenceClinicReducer } = useLocalState<IReferenceClinic[]>()
  const { reducer: formReducer } = useLocalState<IReferenceClinic | null>()
  const { reducer: detailReducer } = useLocalState<IReferenceClinicDetail | null>()
  const { reducer: fetchReducer } = useLocalState<IGeneralFetch[]>()
  const [referenceClinicState, referenceClinicDispatch] = React.useReducer(
    referenceClinicReducer,
    initialStateReferenceClinic,
  )
  const [formState, formDispatch] = React.useReducer(formReducer, initialStateReferenceClinicForm)
  const [detailState, detailDispatch] = React.useReducer(
    detailReducer,
    initialStateReferenceClinicDetail,
  )
  const [campusState, campusDispatch] = React.useReducer(fetchReducer, initialStateFetchOptions)
  const [topicState, topicDispatch] = React.useReducer(fetchReducer, initialStateFetchOptions)
  const [timeSlotState, timeSlotDispatch] = React.useReducer(fetchReducer, initialStateFetchOptions)
  const [activeFilter, setActiveFilter] = React.useState<IReferenceClinicFilter>({})
  const [isOpen, setIsOpen] = React.useState<IDialogTypeOpen>({
    form: false,
    delete: false,
  })

  const fetchData = async (filter?: IReferenceClinicFilter) => {
    try {
      referenceClinicDispatch({ type: 'request' })

      const response = await getReferenceClinic(controller.signal, filter)

      const { data, status, message } = response.data

      if (!status) throw message

      referenceClinicDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      referenceClinicDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDataCampus = async () => {
    try {
      campusDispatch({ type: 'request' })

      const response = await fetchCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      campusDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      campusDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDataTopic = async (campusId: string) => {
    try {
      topicDispatch({ type: 'request' })

      const response = await fetchTopic(campusId, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      topicDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      topicDispatch({ type: 'failure', error: errorMessage })
    }
  }

  const fetchDataDetail = async (referenceID: string) => {
    try {
      detailDispatch({ type: 'request' })

      const response = await getDetailReferenceClinic(referenceID, controller.signal)

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

  const fetchDataReferenceSchedule = async (campusID: string, appointmentDate: string) => {
    try {
      timeSlotDispatch({ type: 'request' })

      const response = await getReferenceSchedule(campusID, appointmentDate, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      timeSlotDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      timeSlotDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }

  const fetchDataMeetingLink = async () => {
    try {
      const response = await fetchMeetingLink(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      return null
    }
  }

  const onSave = async (values: IReferenceClinicFormData, dialog: DialogType = 'form') => {
    try {
      formDispatch({ type: 'request' })

      const response = await saveReferenceClinic(
        values as IReferenceClinicFormData,
        controller.signal,
      )

      const { status, message } = response.data

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

  const onEdit = (value: IReferenceClinic) => {
    formDispatch({ type: 'success', data: value })
    openDialog('form')
  }

  // const onDelete = (value: IReferenceClinic) => {
  //   formDispatch({ type: 'success', data: value })
  //   openDialog('delete')
  // }

  const onDeleteBulk = (values: GridSelectionModel) => {
    console.group('ReferenceClinic - onDeleteBulk')
    console.table(values)
    console.groupEnd()
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

  const handleLookupMember = async (keyword: string, cb: IMasterMemberLookupMemberCallback) => {
    try {
      if (keyword != '') {
        const response = await fetchLookupMemberByMemberCode(keyword, controller.signal)

        const { data, status, message } = response.data

        if (!status) throw message

        if (!data?.memberCode) throw 'Member not found'

        cb(data)
      }
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      cb(null, errorMessage)
    }
  }

  const handleChangeAppointmentDate = async (date: string) => {
    await fetchDataReferenceSchedule(activeFilter.CampusID ?? '-', date)
  }

  const handleOnOpenForm = async (
    referenceClinic: IReferenceClinic | null,
    cb: IReferenceClinicFormOpenCallback,
  ) => {
    try {
      const [referenceScheduleData, meetingLinkData, referenceClinicData] = await Promise.all([
        referenceClinic
          ? fetchDataReferenceSchedule(
              referenceClinic.campusID ?? '-',
              moment(referenceClinic.appointmentDate).format('YYYY-MM-DD'),
            )
          : null,
        fetchDataMeetingLink(),
        referenceClinic ? fetchDataDetail(referenceClinic.id) : detailState.data ?? null,
      ])
      cb(referenceScheduleData, meetingLinkData, referenceClinicData)
    } catch (err) {
      const errorMessage = err as string

      cb(null, null, null, errorMessage)
    }
  }

  const handleCampusChange = (campus: IGeneralFetch) => {
    if (campus.id) {
      fetchDataTopic(campus.id)
    } else {
      topicDispatch({ type: 'success', data: [] })
    }
  }

  const onShow = (filter: IReferenceClinicFilter) => {
    if (!filter.StartDate) delete filter.StartDate

    if (!filter.EndDate) delete filter.EndDate

    setActiveFilter(filter)
    fetchData(filter)
  }

  const openDialog = (dialog: DialogType) => setIsOpen((prev) => ({ ...prev, [dialog]: true }))
  const closeDialog = (dialog: DialogType) => {
    setIsOpen((prev) => ({ ...prev, [dialog]: false }))
    formDispatch({ type: 'success', data: null })
  }

  React.useEffect(() => {
    fetchDataCampus()
    // fetchData()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Reference Clinic" />
      <ReferenceClinicFilter
        loading={false}
        campusOptions={campusState.data}
        topicOptions={topicState.data}
        onCampusChange={handleCampusChange}
        onShow={onShow}
      />
      <ReferenceClinicDatagrid
        loading={referenceClinicState.isLoading}
        rows={referenceClinicState.data as IReferenceClinic[]}
        onAdd={() => openDialog('form')}
        onEdit={onEdit}
        // onDelete={onDelete}
        onDeleteBulk={onDeleteBulk}
      />
      <ReferenceClinicForm
        open={isOpen.form}
        defaultValue={formState.data}
        timeSlotOptions={timeSlotState.data}
        loading={formState.isLoading}
        type={formState.data ? 'edit' : 'add'}
        onClose={() => closeDialog('form')}
        onConfirm={onSave}
        onOpen={handleOnOpenForm}
        onLookupBinusian={handleLookupBinusian}
        onLookupMember={handleLookupMember}
        onChangeAppointmentDate={handleChangeAppointmentDate}
      />
      {/* <ReferenceClinicDelete
        open={isOpen.delete}
        defaultValue={formState.data}
        loading={formState.isLoading}
        onClose={() => closeDialog('delete')}
        // onConfirm={(values) => onSave(values, "delete")}
      /> */}
    </React.Fragment>
  )
}

export default ReferenceClinic
