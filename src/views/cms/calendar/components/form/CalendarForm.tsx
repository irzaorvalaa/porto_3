import * as React from 'react'
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import {
  initialCalendarFormdata,
  CalendarSchema,
} from './constants'
import {
  ICalendarFormData,
  ICalendarFormProps,
} from './interfaces'
import './CalendarForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const CalendarForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: ICalendarFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])
  const [startDate, setStartDate] = React.useState<null | Date>(null)
  const [endDate, setEndDate] = React.useState<null | Date>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ICalendarFormData>({
    defaultValues: initialCalendarFormdata,
    resolver: yupResolver(CalendarSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    if (defaultValue?.id)
    {
      let selectedCampus = defaultValue.campusLocation ? defaultValue.campusLocation.map((x) => ({ id: x.campusId, label: x.campusName })) : []
      if (selectedCampus.find(x => x.id == 'All')) {
        setValue('selAllCampus','T')
        selectedCampus = selectedCampus?.filter((x) => x.id != 'All')
      }
      setCampus(selectedCampus)
      setValue('campusID', selectedCampus.map((x) => x.id))

      onChangeStartDate(new Date(moment(defaultValue?.effDateStart).toDate()))
      setValue('effDateStart', defaultValue?.effDateStart)
      onChangeEndDate(new Date(moment(defaultValue?.effDateEnd).toDate()))
      setValue('effDateEnd', defaultValue?.effDateEnd)
    }
    else
    {
      onChangeStartDate(new Date(moment(startDate).toDate()))
      onChangeEndDate(new Date(moment(endDate).toDate()))
    }
    
    setValue('id', defaultValue?.id)
    setValue('label', defaultValue?.label)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setCampus([])
    reset(initialCalendarFormdata)
  }

  const onSubmit = (values: ICalendarFormData) => {
    const campusID: string[] = campus.map((x) => x.id)
    const campusName: string[] = campus.map((x) => x.label)
    const postData: ICalendarFormData = {
      ...values,
      campusID,
      campusName,
    }
    onConfirm?.(postData)
  }

  const setValueDate = async (value: Date | string, type: string) => {
    if (value != '') {
      const newValue = moment(value).format(FORMAT_DATE_POST)

      setValue(type == 'start' ? 'effDateStart' : 'effDateEnd', newValue)
    } else {
      setValue(type == 'start' ? 'effDateStart' : 'effDateEnd', '')
    }
  }

  const onChangeStartDate = (value: Date | null) => {
    const date = moment(value)
    if (date.isValid()) {
      setStartDate(value)
      setValueDate(value ? value : '', 'start')
    } else {
      setValueDate('', 'start')
    } 
  }
  const onChangeEndDate = (value: Date | null) => {
    const date = moment(value)
    if (date.isValid()) {
      setEndDate(value)
      setValueDate(value ? value : '', 'end')
    } else {
      setValueDate('', 'end')
    } 
  }

  const handleSetAllCampus = () => {
    setValue('selAllCampus',watch('selAllCampus')=='T' ? 'F' : 'T')
}


  const getTitle = () => {
    const title = 'Off Day'

    if (type === 'edit') {
      return 'Edit '.concat(title)
    }

    return 'Add '.concat(title)
  }

  return (
    <DialogForm
      open={open}
      size="xs"
      title={getTitle()}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleSubmit(onSubmit)}
      TransitionProps={{
        onEnter: onEnter,
        onExit: onExit,
      }}
      labelConfirmButton="SAVE"
      labelCancelButton="CANCEL"
      {...other}
    >
      <form>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Start Date *</FormLabel>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                showDaysOutsideCurrentMonth
                className="hidden sm:block"
                mask="__/__/____"
                minDate={new Date()}
                inputFormat={FORMAT_DATE_INPUT}
                value={startDate}
                onChange={onChangeStartDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'effDateStart')}
                    helperText={errors.effDateStart?.message}
                  />
                )}
              />
              <MobileDatePicker
                showDaysOutsideCurrentMonth
                className="block sm:hidden"
                mask="__/__/____"
                minDate={new Date()}
                inputFormat={FORMAT_DATE_INPUT}
                value={startDate}
                onChange={onChangeStartDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'effDateStart')}
                    helperText={errors.effDateStart?.message}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">End Date *</FormLabel>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                showDaysOutsideCurrentMonth
                className="hidden sm:block"
                mask="__/__/____"
                minDate={new Date()}
                inputFormat={FORMAT_DATE_INPUT}
                value={endDate}
                onChange={onChangeEndDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'effDateEnd')}
                    helperText={errors.effDateEnd?.message}
                  />
                )}
              />
              <MobileDatePicker
                showDaysOutsideCurrentMonth
                className="block sm:hidden"
                mask="__/__/____"
                minDate={new Date()}
                inputFormat={FORMAT_DATE_INPUT}
                value={endDate}
                onChange={onChangeEndDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'effDateEnd')}
                    helperText={errors.effDateEnd?.message}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Name *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'label')}
              helperText={errors.label?.message}
              {...register('label')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Campus *</FormLabel>
            <FormGroup>
                  <FormControlLabel control={ 
                    <Checkbox 
                      onChange={handleSetAllCampus} 
                      checked={watch('selAllCampus')=='T' ? true : false} />} 
                      label="All Campus"/>
                </FormGroup>
                { watch('selAllCampus')=='F' && (
            <Controller
              control={control}
              name="campusID"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  multiple
                  value={campus}
                  options={campusOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue ? newValue.map((v) => v.id) : [])
                    setCampus(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select" 
                      size="small"
                      error={isFieldError(errors, 'campusID')}
                      helperText={errors.campusID?.message}
                    />
                  )}
                />
              )}
            />
                  )}
          </FormControl>
        </div>
      </form>
    </DialogForm>
  )
}

export default CalendarForm
