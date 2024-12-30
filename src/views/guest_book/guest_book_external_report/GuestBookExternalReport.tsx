import * as React from 'react'
import { useSnackbar } from 'notistack'
import { useLocalState } from '../../../helpers/useLocalState'
import { initialStateFetchOptions, initialStateGuestBookExternalReport } from './constants'
import { IGuestBookExternalReport } from './interfaces'
import { IGuestBookExternalReportFilter } from './components/filter/interfaces'
import { exportExcel, fetchCampus, getReport } from './utilities'
import { IGeneralFetch } from '../../../interfaces/IGeneralFetch'

// Components
import HeroPage from '../../../components/hero_page'
import GuestBookExternalReportDatagrid from './components/datagrid'
import GuestBookExternalReportFilter from './components/filter'
import { ApiReferenceService } from '../../../constants/ApiReferenceService'
import { ApiGuestBookExternalReport } from '../../../constants/ApiGuestBookExternalReport'

const GuestBookExternalReport = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const [activeFilter, setActiveFilter] = React.useState<IGuestBookExternalReportFilter>({})
  const { reducer: reportReducer } = useLocalState<IGuestBookExternalReport[]>()
  const { reducer: campusReducer } = useLocalState<IGeneralFetch[]>()
  const { reducer: topicReducer } = useLocalState<IGeneralFetch[]>()
  const [reportState, reportDispatch] = React.useReducer(
    reportReducer,
    initialStateGuestBookExternalReport,
  )
  const [campusState, campusDispatch] = React.useReducer(campusReducer, initialStateFetchOptions)
  const [topicState, topicDispatch] = React.useReducer(topicReducer, initialStateFetchOptions)

  const fetchDataReport = async (filter?: IGuestBookExternalReportFilter) => {
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

  const onShow = (filter: IGuestBookExternalReportFilter) => {
    if (!filter.StartDate) delete filter.StartDate

    if (!filter.EndDate) delete filter.EndDate

    setActiveFilter(filter)
    fetchDataReport(filter)
  }

  const handleExport = async (filter: IGuestBookExternalReportFilter) => {
    try {
      let url = process.env.REACT_APP_API_BE_URL + ApiGuestBookExternalReport.export + '?';
      url += 'CampusID=' + filter.CampusID;
      url += '&StartDate=' + filter.StartDate;
      url += '&EndDate=' + filter.EndDate;

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
    // fetchDataReport()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Guestbook External Report" />
      <GuestBookExternalReportFilter
        loading={false}
        campusOptions={campusState.data}
        onShow={onShow}
        onExport={handleExport}
      />
      <GuestBookExternalReportDatagrid
        loading={reportState.isLoading}
        rows={reportState.data as IGuestBookExternalReport[]}
      />
    </React.Fragment>
  )
}

export default GuestBookExternalReport
