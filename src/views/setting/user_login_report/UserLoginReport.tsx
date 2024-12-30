import * as React from 'react'
import { useSnackbar } from 'notistack'
import { useLocalState } from '../../../helpers/useLocalState'
import { initialStateAcademicGroup, initialStateAcademicOrganization, initialStateAcademicProgram, initialStateCampus, initialStateFetchOptions, initialStateUserLoginReport } from './constants'
import { IUserLoginReport } from './interfaces'
import { IUserLoginReportFilter } from './components/filter/interfaces'
import { exportExcel, fetchAcademicGroup, fetchAcademicOrganization, fetchAcademicProgram, fetchMasterCampus, getReport } from './utilities'
import { IGeneralFetch } from '../../../interfaces/IGeneralFetch'

// Components
import HeroPage from '../../../components/hero_page'
import UserLoginReportDatagrid from './components/datagrid'
import UserLoginReportFilter from './components/filter'
import { IFormDataOption } from '../../../interfaces/IFormData'
import { ApiLoginReport } from '../../../constants/ApiLoginReport'

const UserLoginReport = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [activeFilter, setActiveFilter] = React.useState<IUserLoginReportFilter>({})
  const { reducer: reportReducer } = useLocalState<IUserLoginReport[]>()
  const { reducer: loginSourceReducer } = useLocalState<IFormDataOption[]>()
  const [campusState, campusDispatch] = React.useReducer(reducer, initialStateCampus)
  const [academicGroupState, academicGroupDispatch] = React.useReducer(reducer, initialStateAcademicGroup)
  const [academicOrganizationState, academicOrganizationDispatch] = React.useReducer(reducer, initialStateAcademicOrganization)
  const [academicProgramState, academicProgramDispatch] = React.useReducer(reducer, initialStateAcademicProgram)
  const [reportState, reportDispatch] = React.useReducer(
    reportReducer,
    initialStateUserLoginReport,
  )

  const fetchDataReport = async (filter?: IUserLoginReportFilter) => {
    try {
      reportDispatch({ type: 'request' })

      const response = await getReport(controller.signal, filter)

      const { data, status, message } = response.data

      if (!status) throw message

      reportDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      reportDispatch({ type: 'failure', error: errorMessage })
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

  const onShow = (filter: IUserLoginReportFilter) => {
    if (!filter.StartDate) delete filter.StartDate

    if (!filter.EndDate) delete filter.EndDate

    setActiveFilter(filter)
    fetchDataReport(filter)
  }

  const handleExport = async (filter: IUserLoginReportFilter) => {
    try {
      let url = process.env.REACT_APP_API_BE_URL + ApiLoginReport.export + '?'
      url += 'CampusID=' + (filter.campusID != undefined ? filter.campusID : '')
      url += '&AcademicGroup=' + (filter.academicGroup != undefined ? filter.academicGroup : '')
      url += '&AcademicOrganization=' + (filter.academicOrganization != undefined ? filter.academicOrganization : '')
      url += '&AcademicProgram=' + (filter.academicProgram != undefined ? filter.academicProgram : '')
      url += '&LoginSource=' + (filter.LoginSource != undefined ? filter.LoginSource : '')
      url += '&StartDate=' + filter.StartDate
      url += '&EndDate=' + filter.EndDate
      url += '&reportType=' + filter.reportType
      url += '&showUser=' + filter.showUser

      window.open(url, '_blank')

      // const response = await exportExcel(controller.signal, activeFilter)

      // const { data } = response
      
      // window.open(data, '_blank')
    } catch (err) {
      // const errorMessage = err as string
      // if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  React.useEffect(() => {
    // fetchDataReport()
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
      <HeroPage title="User Login Report" />
      <UserLoginReportFilter
        loading={false}
        campusOptions={campusState.data}
        academicGroupOptions={academicGroupState.data}
        academicOrganizationOptions={academicOrganizationState.data}
        academicProgramOptions={academicProgramState.data}
        onShow={onShow}
        onExport={handleExport}
      />
      <UserLoginReportDatagrid
        loading={reportState.isLoading}
        rows={reportState.data as IUserLoginReport[]}
      />
    </React.Fragment>
  )
}

export default UserLoginReport
