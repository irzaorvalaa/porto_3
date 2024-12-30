import * as React from 'react'
import { useSnackbar } from 'notistack'
import { useLocalState } from '../../helpers/useLocalState'
import { initialStateFetchOptions, initialStateReferenceServiceReport } from './constants'
import { IReferenceServiceReport } from './interfaces'
import { IReferenceServiceReportFilter } from './components/transaction_history_filter/interfaces'
import { fetchCampus, fetchTopic, getReport } from './utilities'
import { IGeneralFetch } from '../../interfaces/IGeneralFetch'

// Components
import HeroPage from '../../components/hero_page'
import TransactionHistoryDatagrid from './components/transaction_history_datagrid'
import TransactionHistoryFilter from './components/transaction_history_filter'
import { ApiReferenceService } from '../../constants/ApiReferenceService'

const TransactionHistory = () => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()

  // Local State
  const { reducer: reportReducer } = useLocalState<IReferenceServiceReport[]>()
  const { reducer: campusReducer } = useLocalState<IGeneralFetch[]>()
  const { reducer: topicReducer } = useLocalState<IGeneralFetch[]>()
  const [reportState, reportDispatch] = React.useReducer(
    reportReducer,
    initialStateReferenceServiceReport,
  )
  const [campusState, campusDispatch] = React.useReducer(campusReducer, initialStateFetchOptions)
  const [topicState, topicDispatch] = React.useReducer(topicReducer, initialStateFetchOptions)

  const fetchDataReport = async (filter?: IReferenceServiceReportFilter) => {
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

  const handleCampusChange = (campus: IGeneralFetch) => {
    if (campus.id) {
      fetchDataTopic(campus.id)
    } else {
      topicDispatch({ type: 'success', data: [] })
    }
  }

  const onShow = (filter: IReferenceServiceReportFilter) => {
    if (!filter.StartDate) delete filter.StartDate

    if (!filter.EndDate) delete filter.EndDate

    fetchDataReport(filter)
  }

  const handleExport = async (filter: IReferenceServiceReportFilter) => {
    try {
      let url = process.env.REACT_APP_API_BE_URL + ApiReferenceService.exportExcel + '?'
      url += 'CampusID=' + filter.CampusID
      url += '&StartDate=' + filter.StartDate
      url += '&EndDate=' + filter.EndDate
      url += '&Topic=' + filter.Topic

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
    fetchDataReport()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <React.Fragment>
      <HeroPage title="Transaction History" />
      <TransactionHistoryFilter
        loading={false}
        campusOptions={campusState.data}
        topicOptions={topicState.data}
        onCampusChange={handleCampusChange}
        onShow={onShow}
        onExport={handleExport}
      />
      <TransactionHistoryDatagrid
        loading={reportState.isLoading}
        rows={reportState.data as IReferenceServiceReport[]}
      />
    </React.Fragment>
  )
}

export default TransactionHistory
