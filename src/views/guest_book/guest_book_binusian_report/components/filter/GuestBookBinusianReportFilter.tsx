import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { IGuestBookBinusianReportFilter, IGuestBookBinusianReportFilterProps } from './interfaces'
import {
  pSelOptions,
  initialStateGuestBookBinusianReportFilter,
} from './constants'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import './GuestBookBinusianReportFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const GuestBookBinusianReportFilter = ({
  campusOptions = [],
  academicGroupOptions = [],
  academicOrganizationOptions = [],
  academicProgramOptions = [],
  loading = false,
  onShow,
  onExport,
}: IGuestBookBinusianReportFilterProps) => {
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()

  const allOption: IGeneralFetch = {
    id: '',
    label: 'All',
  }
  const arrUserType: IFormDataOption[] = [
    {
      value: '1',
      label: 'Student',
    },
    {
      value: '2',
      label: 'Lecturer',
    },
  ]

  // State
  const [filter, setFilter] = React.useState<IGuestBookBinusianReportFilter>(
    initialStateGuestBookBinusianReportFilter,
  )
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [filterShowUser, setFilterShowUser] = React.useState<IFormDataOption>(arrUserType[0])
  const [filterAcademicGroup, setFilterAcademicGroup] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicOrganization, setFilterAcademicOrganization] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicProgram, setFilterAcademicProgram] = React.useState<IGeneralFetch>(allOption)
  const [startDate, setStartDate] = React.useState<Date | null>(startOfMonth)
  const [endDate, setEndDate] = React.useState<Date | null>(endOfMonth)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IGuestBookBinusianReportFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    if (!filterCampus.id) {
      // setRequiredCampus('Campus is required')
    }

    if (onShow /* && filterCampus.id */) {
      if (filter.StartDate == '') filter.StartDate = moment(startDate).format(FORMAT_DATE_POST)
      if (filter.EndDate == '') filter.EndDate = moment(endDate).format(FORMAT_DATE_POST)
      if (filter.StartDate == '') onChangeDate(startDate, 'start')
      if (filter.EndDate == '') onChangeDate(endDate, 'end')
      
      onShow(filter)
    }
  }

  const handleExport = () => {
    if (!filterCampus.id) {
      // setRequiredCampus('Campus is required')
    }

    if (onExport /* && filterCampus.id */) {

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
    setFilterCampus(value)

    // if (value.id) setRequiredCampus('')

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
              value={filterCampus}
              options={[pSelOptions, ...campusOptions]}
              onChange={(_, newValue) => {
                setValue('campusID', newValue.id)
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
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Show User</FormLabel>
            <Autocomplete
              disableClearable
              value={filterShowUser}
              options={arrUserType}
              onChange={(_, newValue) => {
                setValue('showUser', newValue.value)
                setFilterShowUser(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Academic Group</FormLabel>
            <Autocomplete
              disableClearable
              value={filterAcademicGroup}
              options={[allOption, ...academicGroupOptions]}
              onChange={(_, newValue) => {
                setValue('academicGroup', newValue.id)
                setFilterAcademicGroup(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          { filterShowUser.value == "1" && (
            <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Academic Program</FormLabel>
            <Autocomplete
              disableClearable
              value={filterAcademicProgram}
              options={[allOption, ...academicProgramOptions]}
              onChange={(_, newValue) => {
                setValue('academicProgram', newValue.id)
                setFilterAcademicProgram(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          )}
          { filterShowUser.value == "2" && (
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Academic Organization</FormLabel>
            <Autocomplete
              disableClearable
              value={filterAcademicOrganization}
              options={[allOption, ...academicOrganizationOptions]}
              onChange={(_, newValue) => {
                setValue('academicOrganization', newValue.id)
                setFilterAcademicOrganization(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
          )}
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

export default GuestBookBinusianReportFilter
