import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { IReferenceClinicFilter, IReferenceClinicFilterProps } from './interfaces'
import { allCampusOptions, allTopicOptions, initialStateReferenceClinicFilter } from './constants'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import './ReferenceClinicFilter.scss'

const ReferenceClinicFilter = ({
  campusOptions = [],
  topicOptions = [],
  loading = false,
  onShow,
  onCampusChange,
}: IReferenceClinicFilterProps) => {
  const startOfMonth = moment().startOf('month').toDate()
  const endOfMonth = moment().endOf('month').toDate()

  // State
  const [filter, setFilter] = React.useState<IReferenceClinicFilter>(
    initialStateReferenceClinicFilter,
  )
  const [selectedCampus, setSelectedCampus] = React.useState<IGeneralFetch>(allCampusOptions)
  const [selectedTopic, setSelectedTopic] = React.useState<IGeneralFetch>(allTopicOptions)
  const [startDate, setStartDate] = React.useState<Date | null>(startOfMonth)
  const [endDate, setEndDate] = React.useState<Date | null>(endOfMonth)
  const [requiredCampus, setRequiredCampus] = React.useState<string>('')
  const [invalidStartDate, setInvalidStartDate] = React.useState<string>('')
  const [invalidEndDate, setInvalidEndDate] = React.useState<string>('')

  const setValue = (field: keyof IReferenceClinicFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }))
  }

  const handleShow = () => {
    if (!selectedCampus.id) {
      setRequiredCampus('Campus is required')
    }

    if (onShow && selectedCampus.id && !invalidStartDate && !invalidEndDate) {
      if (filter.StartDate == '') filter.StartDate = moment(startDate).format(FORMAT_DATE_POST)
      if (filter.EndDate == '') filter.EndDate = moment(endDate).format(FORMAT_DATE_POST)
      if (filter.StartDate == '') onChangeDate(startDate, 'start')
      if (filter.EndDate == '') onChangeDate(endDate, 'end')

      onShow(filter)
    }
  }

  const onChangeDate = (value: Date | null, type: 'start' | 'end') => {
    try {
      const newValue = moment(value).format(FORMAT_DATE_POST)

      if (newValue.includes('Invalid date')) throw newValue

      if (type === 'start') {
        setStartDate(value)
        setInvalidStartDate('')
        setValue('StartDate', newValue)
      } else {
        setEndDate(value)
        setInvalidEndDate('')
        setValue('EndDate', newValue)
      }
    } catch (err) {
      switch (type) {
        case 'start':
          setInvalidStartDate(err as string)
          break
        case 'end':
          setInvalidEndDate(err as string)
          break
        default:
          console.log('onChangeDate - error', err)
          break
      }
    }
  }

  const handleCampusChange = (value: IGeneralFetch) => {
    setSelectedCampus(value)

    if (value.id) setRequiredCampus('')

    if (onCampusChange) onCampusChange(value)
  }

  return (
    <div className="reference-clinic-filter">
      <div className="reference-clinic-filter__container">
        <div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Campus *</FormLabel>
            <Autocomplete
              disableClearable
              value={selectedCampus}
              options={[allCampusOptions, ...campusOptions]}
              onChange={(_, newValue) => {
                setValue('CampusID', newValue.id)
                handleCampusChange(newValue)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
          <div className="reference-clinic-filter__datepicker">
            <FormControl fullWidth margin="dense">
              <FormLabel className="reference-clinic__formlabel">Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  showDaysOutsideCurrentMonth
                  disableMaskedInput
                  className="hidden sm:block"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  maxDate={endDate}
                  value={startDate}
                  onChange={(value) => onChangeDate(value, 'start')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      error={invalidStartDate !== ''}
                      helperText={invalidStartDate}
                    />
                  )}
                />
                <MobileDatePicker
                  showDaysOutsideCurrentMonth
                  disableMaskedInput
                  className="block sm:hidden"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  maxDate={endDate}
                  value={startDate}
                  onChange={(value) => onChangeDate(value, 'start')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      error={invalidStartDate !== ''}
                      helperText={invalidStartDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <FormLabel className="reference-clinic__formlabel">End Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  showDaysOutsideCurrentMonth
                  disableMaskedInput
                  className="hidden sm:block"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  minDate={startDate}
                  value={endDate}
                  onChange={(value) => onChangeDate(value, 'end')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      error={invalidEndDate !== ''}
                      helperText={invalidEndDate}
                    />
                  )}
                />
                <MobileDatePicker
                  showDaysOutsideCurrentMonth
                  disableMaskedInput
                  className="block sm:hidden"
                  mask="__/__/____"
                  inputFormat={FORMAT_DATE_INPUT}
                  minDate={startDate}
                  value={endDate}
                  onChange={(value) => onChangeDate(value, 'end')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      error={invalidEndDate !== ''}
                      helperText={invalidEndDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Topic *</FormLabel>
            <Autocomplete
              disableClearable
              value={selectedTopic}
              options={[allTopicOptions, ...topicOptions]}
              onChange={(_, newValue) => {
                setValue('Topic', newValue.id)
                setSelectedTopic(newValue)
              }}
              getOptionLabel={(option) => option.label ?? ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </FormControl>
        </div>
        <div />
      </div>
      <LoadingButton
        disableElevation
        variant="contained"
        color="secondary"
        className="button button--secondary reference-clinic-filter__button"
        loading={loading}
        disabled={loading}
        onClick={handleShow}
      >
        SHOW
      </LoadingButton>
    </div>
  )
}

export default ReferenceClinicFilter
