import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { IGuestBookExternalReportFilter, IGuestBookExternalReportFilterProps } from './interfaces'
import {
  allCampusOptions,
  initialStateGuestBookExternalReportFilter,
} from './constants'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import './GuestBookExternalReportFilter.scss'

const GuestBookExternalReportFilter = ({
  campusOptions = [],
  loading = false,
  onShow,
  onExport,
}: IGuestBookExternalReportFilterProps) => {
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()

  // State
  const [filter, setFilter] = React.useState<IGuestBookExternalReportFilter>(
    initialStateGuestBookExternalReportFilter,
  )
  const [selectedCampus, setSelectedCampus] = React.useState<IGeneralFetch>(allCampusOptions)
  const [startDate, setStartDate] = React.useState<Date | null>(startOfMonth)
  const [endDate, setEndDate] = React.useState<Date | null>(endOfMonth)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IGuestBookExternalReportFilter, value: string) => {
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

    // if (onCampusChange) onCampusChange(value)
  }

  return (
    <div className="report-filter">
      <div className="report-filter__container">
        <div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="report__formlabel">Campus *</FormLabel>
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
          <div className="report-filter__datepicker">
            <FormControl fullWidth margin="dense">
              <FormLabel className="report__formlabel">
                Start Date
              </FormLabel>
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
              <FormLabel className="report__formlabel">
                End Date
              </FormLabel>
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
        </div>
        <div />
      </div>
      <div className="report__container">
        <div>
          <LoadingButton
            disableElevation
            variant="contained"
            color="secondary"
            className="button button--secondary report-filter__button"
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
          className="button button--secondary report-filter__button"
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

export default GuestBookExternalReportFilter
