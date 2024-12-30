import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import { IGuestBookExternalFilter, IGuestBookExternalFilterProps } from './interfaces'
import { allOption, initialStateGuestBookExternalFilter } from './constants'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import './GuestBookExternalFilter.scss'
import { IFormDataOption } from '../../../../../interfaces/IFormData'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const GuestBookExternalFilter = ({
  campusOptions = [],
  loading = false,
  onShow,
}: IGuestBookExternalFilterProps) => {
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()
  
  // State
  const [filter, setFilter] = React.useState<IGuestBookExternalFilter>({
    ...initialStateGuestBookExternalFilter,
  })
  const [filterCampus, setFilterCampus] = React.useState<IGeneralFetch>(allOption)
  const [startDate, setStartDate] = React.useState<Date | null>(startOfMonth)
  const [endDate, setEndDate] = React.useState<Date | null>(endOfMonth)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')

  const setValue = (field: keyof IGuestBookExternalFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    // if (!filterCampus.id) {
    //   setRequiredCampus('Campus Location is required')
    // }
    if (onShow) {
      if (filter.startDate == '') filter.startDate = moment(startDate).format(FORMAT_DATE_POST)
      if (filter.endDate == '') filter.endDate = moment(endDate).format(FORMAT_DATE_POST)
      if (filter.startDate == '') onChangeDate(startDate, 'start')
      if (filter.endDate == '') onChangeDate(endDate, 'end')
      
      onShow(filter)
    }

  }

  const onChangeDate = (value: Date | null, type: 'start' | 'end') => {
    const newValue = moment(value).format(FORMAT_DATE_POST)

    if (type === 'start') {
      setStartDate(value)
      setValue('startDate', newValue)
    } else {
      setEndDate(value)
      setValue('endDate', newValue)
    }
  }

  return (
    <div className="datagrid--toolbar-filter">
      <div className="datagrid--toolbar-filter__container">
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
              renderInput={(params) => <TextField {...params} size="small" error={requiredCampus !== ''} helperText={requiredCampus} />}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="datagrid--toolbar-filter__formlabel">
              Visit Date (Start)
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
            <FormLabel className="datagrid--toolbar-filter__formlabel">
            Visit Date (End)
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
      <LoadingButton
        disableElevation
        variant="contained"
        color="secondary"
        className="button button--secondary datagrid--toolbar-filter__button"
        loading={loading}
        disabled={loading}
        onClick={handleShow}
      >
        SHOW
      </LoadingButton>
    </div>
  )
}

export default GuestBookExternalFilter
