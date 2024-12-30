import * as React from 'react'
import { useSnackbar } from 'notistack'
import { useLocalState } from '../../../helpers/useLocalState'
import { initialStateAcademicGroup, initialStateAcademicOrganization, initialStateAcademicProgram, initialStateFetchOptions, initialStateGuestBookBinusianReport } from './constants'
import { IGuestBookBinusianReport } from './interfaces'
import { IGuestBookBinusianReportFilter } from './components/filter/interfaces'
import { exportExcel, fetchCampus, getReport, fetchAcademicGroup, fetchAcademicProgram, fetchAcademicOrganization } from './utilities'
import { IGeneralFetch } from '../../../interfaces/IGeneralFetch'

// Components
import HeroPage from '../../../components/hero_page'
import GuestBookBinusianReportDatagrid from './components/datagrid'
import GuestBookBinusianReportFilter from './components/filter'
import { ApiReferenceService } from '../../../constants/ApiReferenceService'
import { ApiGuestBookBinusianReport } from '../../../constants/ApiGuestBookBinusianReport'

const GuestBookBinusianReport = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer } = useLocalState()
  const [activeFilter, setActiveFilter] = React.useState<IGuestBookBinusianReportFilter>({})
  const { reducer: reportReducer } = useLocalState<IGuestBookBinusianReport[]>()
  const { reducer: campusReducer } = useLocalState<IGeneralFetch[]>()
  const { reducer: acadGroupReducer } = useLocalState<IGeneralFetch[]>()
  const { reducer: acadProgReducer } = useLocalState<IGeneralFetch[]>()
  const [reportState, reportDispatch] = React.useReducer(
    reportReducer,
    initialStateGuestBookBinusianReport,
  )
  const [campusState, campusDispatch] = React.useReducer(campusReducer, initialStateFetchOptions)
  const [academicGroupState, academicGroupDispatch] = React.useReducer(reducer, initialStateAcademicGroup)
  const [academicOrganizationState, academicOrganizationDispatch] = React.useReducer(reducer, initialStateAcademicOrganization)
  const [academicProgramState, academicProgramDispatch] = React.useReducer(reducer, initialStateAcademicProgram)

  const fetchDataReport = async (filter?: IGuestBookBinusianReportFilter) => {
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

  const onShow = (filter: IGuestBookBinusianReportFilter) => {
    if (!filter.StartDate) delete filter.StartDate

    if (!filter.EndDate) delete filter.EndDate

    setActiveFilter(filter)
    fetchDataReport(filter)
  }

  const handleExport = async (filter: IGuestBookBinusianReportFilter) => {
    try {
      let url = process.env.REACT_APP_API_BE_URL + ApiGuestBookBinusianReport.export + '?';
      url += 'CampusID=' + (filter.campusID != undefined ? filter.campusID : '')
      url += '&AcademicGroup=' + (filter.academicGroup != undefined ? filter.academicGroup : '')
      url += '&AcademicOrganization=' + (filter.academicOrganization != undefined ? filter.academicOrganization : '')
      url += '&AcademicProgram=' + (filter.academicProgram != undefined ? filter.academicProgram : '')
      url += '&StartDate=' + filter.StartDate;
      url += '&EndDate=' + filter.EndDate;
      url += '&ShowUser=' + filter.showUser;

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
    fetchDataCampus()
    getAcademicProgram()
    getAcademicOrganization()
    getAcademicGroup()
    // fetchDataReport()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Guestbook Binusian Report" />
      <GuestBookBinusianReportFilter
        loading={false}
        campusOptions={campusState.data}
        academicGroupOptions={academicGroupState.data}
        academicOrganizationOptions={academicOrganizationState.data}
        academicProgramOptions={academicProgramState.data}
        onShow={onShow}
        onExport={handleExport}
      />
      <GuestBookBinusianReportDatagrid
        loading={reportState.isLoading}
        rows={reportState.data as IGuestBookBinusianReport[]}
      />
    </React.Fragment>
  )
}

export default GuestBookBinusianReport
