import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { IUserLoginReportFilter, IUserLoginReportFilterProps } from './interfaces'
import {
  allOption,
  initialStateUserLoginReportFilter,
} from './constants'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import './UserLoginReportFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'

const UserLoginReportFilter = ({
  campusOptions = [],
  academicGroupOptions = [],
  academicOrganizationOptions = [],
  academicProgramOptions = [],
  loading = false,
  onShow,
  onExport,
}: IUserLoginReportFilterProps) => {
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()

  const loginSourceOption: IFormDataOption[] = [
    {
      value: '',
      label: 'All',
    },
    {
      value: 'android',
      label: 'Android',
    },
    {
      value: 'ios',
      label: 'IOS',
    },
    {
      value: 'Web',
      label: 'Web',
    },
    {
      value: 'backoffice',
      label: 'Backoffice',
    },
  ]
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
  const arrReportType: IFormDataOption[] = [
    {
      value: '1',
      label: 'Transactional',
    },
    {
      value: '2',
      label: 'Summary',
    },
  ]

  // State
  const [filter, setFilter] = React.useState<IUserLoginReportFilter>(
    initialStateUserLoginReportFilter,
  )
  const [selectedLoginSource, setSelectedLoginSource] = React.useState<IFormDataOption>(loginSourceOption[0])
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [filterShowUser, setFilterShowUser] = React.useState<IFormDataOption>(arrUserType[0])
  const [filterReportType, setFilterReportType] = React.useState<IFormDataOption>(arrReportType[0])
  const [filterAcademicGroup, setFilterAcademicGroup] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicOrganization, setFilterAcademicOrganization] = React.useState<IGeneralFetch>(allOption)
  const [filterAcademicProgram, setFilterAcademicProgram] = React.useState<IGeneralFetch>(allOption)
  const [startDate, setStartDate] = React.useState<Date | null>(startOfMonth)
  const [endDate, setEndDate] = React.useState<Date | null>(endOfMonth)

  const setValue = (field: keyof IUserLoginReportFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    if (onShow) {

      if (filter.StartDate == '') filter.StartDate = moment(startDate).format(FORMAT_DATE_POST)
      if (filter.EndDate == '') filter.EndDate = moment(endDate).format(FORMAT_DATE_POST)
      if (filter.StartDate == '') onChangeDate(startDate, 'start')
      if (filter.EndDate == '') onChangeDate(endDate, 'end')

      onShow(filter)
    }
  }

  const handleExport = () => {
    if (onExport) {

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

  return (
    <div className="report-filter">
      <div className="report-filter__container">
        <div>
        <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">Campus</FormLabel>
            <Autocomplete
              disableClearable
              value={filterCampus}
              options={[allOption, ...campusOptions]}
              onChange={(_, newValue) => {
                setValue('campusID', newValue.id)
                setFilterCampus(newValue)
              }}
              getOptionLabel={(option) => (option.label ? option.label : '')}
              renderInput={(params) => <TextField {...params} size="small" />}
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

          <FormControl fullWidth margin="dense">
            <FormLabel className="report__formlabel">Login Source</FormLabel>
            <Autocomplete
              disableClearable
              value={selectedLoginSource}
              options={loginSourceOption}
              onChange={(_, newValue) => {
                setValue('LoginSource', newValue.value)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
            />
          </FormControl>
          <div className="report-filter__datepicker">
            <FormControl fullWidth margin="dense">
              <FormLabel className="report__formlabel">
                Start Date *
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
                End Date *
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
          <FormControl fullWidth margin="dense">
            <FormLabel className="report__formlabel">Report Type *</FormLabel>
            <Autocomplete
              disableClearable
              value={filterReportType}
              options={arrReportType}
              onChange={(_, newValue) => {
                setValue('reportType', newValue.value)
                setFilterReportType(newValue)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
            />
          </FormControl>
        </div>
        <div />
      </div>
      <div className="report-filter__container">
        <div>
          <LoadingButton
            disableElevation
            variant="contained"
            color="secondary"
            className="button button--secondary report-filter__button"
            loading={loading}
            disabled={loading || filterReportType.value == "2"}
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

export default UserLoginReportFilter
