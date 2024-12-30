import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { ISicepatPickupFilter, ISicepatPickupFilterProps } from './interfaces'
import { allCampusOptions, allTopicOptions, initialStateSicepatPickupFilter } from './constants'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import './SicepatPickupFilter.scss'

const SicepatPickupFilter = ({
  campusOptions = [],
  topicOptions = [],
  loading = false,
  onShow,
  onExport,
  onCampusChange,
}: ISicepatPickupFilterProps) => {
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()

  // State
  const [filter, setFilter] = React.useState<ISicepatPickupFilter>(initialStateSicepatPickupFilter)
  const [selectedCampus, setSelectedCampus] = React.useState<IGeneralFetch>(allCampusOptions)
  const [selectedTopic, setSelectedTopic] = React.useState<IGeneralFetch>(allTopicOptions)
  const [startDate, setStartDate] = React.useState<Date | null>(startOfMonth)
  const [endDate, setEndDate] = React.useState<Date | null>(endOfMonth)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof ISicepatPickupFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    if (!selectedCampus.id) {
      setRequiredCampus('Campus is required')
    }

    if (onShow && selectedCampus.id) {
      if (filter.StartDate == '') filter.StartDate = moment(startDate).format(FORMAT_DATE_POST)
      if (filter.EndDate == '') filter.EndDate = moment(endDate).format(FORMAT_DATE_POST)
      if (filter.StartDate == '') onChangeDate(startDate, 'start')
      if (filter.EndDate == '') onChangeDate(endDate, 'end')

      onShow(filter)
    }
  }

  const handleExport = () => {
    if (!selectedCampus.id) {
      setRequiredCampus('Campus is required')
    }

    if (onExport && selectedCampus.id) {
      if (filter.StartDate == '') filter.StartDate = moment(startDate).format(FORMAT_DATE_POST)
      if (filter.EndDate == '') filter.EndDate = moment(endDate).format(FORMAT_DATE_POST)
      if (filter.StartDate == '') onChangeDate(startDate, 'start')
      if (filter.EndDate == '') onChangeDate(endDate, 'end')

      onExport(filter)
    }
  }

  const onChangeDate = (value: Date | null, type: 'start' | 'end') => {
    const newValue = moment(value).format(FORMAT_DATE_POST)

    if (type === 'start') {
      setStartDate(value)
      setValue('StartDate', newValue)
    } else {
      setEndDate(value)
      setValue('EndDate', newValue)
    }
  }

  const handleCampusChange = (value: IGeneralFetch) => {
    setSelectedCampus(value)

    if (value.id) setRequiredCampus('')

    if (onCampusChange) onCampusChange(value)
  }

  return (
    <div className="reference-service-report-filter">
      <div className="reference-service-report-filter__container">
        <div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-service-report__formlabel">Campus *</FormLabel>
            <Autocomplete
              disableClearable
              value={selectedCampus}
              options={[allCampusOptions, ...campusOptions]}
              onChange={(_, newValue) => {
                setValue('CampusID', newValue.id)
                handleCampusChange(newValue)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  error={requiredCampus !== ''}
                  helperText={requiredCampus}
                />
              )}
            />
          </FormControl>
          <div className="reference-service-report-filter__datepicker">
            <FormControl fullWidth margin="dense">
              <FormLabel className="reference-service-report__formlabel">Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  showDaysOutsideCurrentMonth
                  className="hidden sm:block"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  maxDate={endDate}
                  value={startDate}
                  onChange={(value) => onChangeDate(value, 'start')}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
                <MobileDatePicker
                  showDaysOutsideCurrentMonth
                  className="block sm:hidden"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  maxDate={endDate}
                  value={startDate}
                  onChange={(value) => onChangeDate(value, 'start')}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <FormLabel className="reference-service-report__formlabel">End Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  showDaysOutsideCurrentMonth
                  className="hidden sm:block"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  minDate={startDate}
                  value={endDate}
                  onChange={(value) => onChangeDate(value, 'end')}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
                <MobileDatePicker
                  showDaysOutsideCurrentMonth
                  className="block sm:hidden"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  minDate={startDate}
                  value={endDate}
                  onChange={(value) => onChangeDate(value, 'end')}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-service-report__formlabel">Topic *</FormLabel>
            <Autocomplete
              disableClearable
              value={selectedTopic}
              options={[allTopicOptions, ...topicOptions]}
              onChange={(_, newValue) => {
                setValue('Topic', newValue.id)
                setSelectedTopic(newValue)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
        </div>
        <div />
      </div>
      <div className="reference-service-report__container">
        <div>
          <LoadingButton
            disableElevation
            variant="contained"
            color="secondary"
            className="button button--secondary reference-service-report-filter__button"
            loading={loading}
            disabled={loading}
            onClick={handleShow}
          >
            SHOW
          </LoadingButton>
          <LoadingButton
            disableElevation
            variant="contained"
            color="secondary"
            className="button button--secondary reference-service-report-filter__button"
            loading={loading}
            disabled={loading}
            onClick={handleExport}
          >
            EXPORT TO EXCEL
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}

export default SicepatPickupFilter
