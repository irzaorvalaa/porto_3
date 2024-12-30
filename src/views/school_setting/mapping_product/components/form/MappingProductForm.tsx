import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { DesktopTimePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { initialMappingProductFormdata, MappingProductSchema } from './constants'
import { IMappingProductFormData, IMappingProductFormProps } from './interfaces'
import './MappingProductForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import { FORMAT_DATE_POST, FORMAT_TIME_POST } from '../../../../../constants/Parameter'

const MappingProductForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  dayOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IMappingProductFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [dayName, setDayName] = React.useState<IFormDataOption | null>(dayOptions[0])
  const [campus, setCampus] = React.useState<IGeneralFetch | null>(null)
  const [hourStart, setHourStart] = React.useState<Date | null>(null)
  const [hourEnd, setHourEnd] = React.useState<Date | null>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IMappingProductFormData>({
    defaultValues: initialMappingProductFormdata,
    resolver: yupResolver(MappingProductSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')

    if (defaultValue?.id) {
      const selectedDay = dayOptions.find((item) => item.value === defaultValue?.dayName)
      setDayName(selectedDay || null)
      setValue('dayName', selectedDay?.value)

      const selectedCampus = campusOptions.find((item) => item.id === defaultValue?.campusID)
      setCampus(selectedCampus || null)
      setValue('campusID', selectedCampus?.id)

      onChangeTime(new Date(moment().format(`YYYY-MM-DD ${defaultValue?.startTime}`)), 'hourStart')
      onChangeTime(new Date(moment().format(`YYYY-MM-DD ${defaultValue?.endTime}`)), 'hourEnd')
      setValue('startTime', defaultValue?.startTime)
      setValue('endTime', defaultValue?.endTime)
    }

    setValue('id', defaultValue?.id)
    setValue('label', defaultValue?.label)
    autoFocusRef.current?.focus()
  }

  const onChangeTime = (value: Date | null, field: 'hourStart' | 'hourEnd') => {
    if (field === 'hourStart') {
      setHourStart(value)
    } else {
      setHourEnd(value)
    }

    setValueTime(value || '', field)
  }

  const setValueTime = (value: Date | string, field: 'hourStart' | 'hourEnd') => {
    const newValue = moment(value).format(FORMAT_TIME_POST)
    setValue(field == 'hourStart' ? 'startTime' : 'endTime', newValue)
  }

  const onExit = () => {
    setDayName(null)
    setCampus(null)
    setHourStart(null)
    setHourEnd(null)
    reset(initialMappingProductFormdata)
  }

  const onSubmit = (values: IMappingProductFormData) => {
    const postData: IMappingProductFormData = {
      ...values,
      campusID: campus?.id,
      campusName: campus?.label,
    }
    onConfirm?.(postData)
  }

  const getTitle = () => {
    const title = 'Schedule'

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
            <FormLabel className="complex-form__formlabel">Campus *</FormLabel>
            <Controller
              control={control}
              name="campusID"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={campus}
                  options={campusOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.id)
                    setCampus(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select"
                      size="small"
                      error={isFieldError(errors, 'campusID')}
                      helperText={errors.campusID?.message}
                      {...register('campusID')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Label *</FormLabel>
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
            <FormLabel className="complex-form__formlabel">Day *</FormLabel>
            <Controller
              control={control}
              name="dayName"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={dayName}
                  options={dayOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setDayName(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select"
                      size="small"
                      error={isFieldError(errors, 'dayName')}
                      helperText={errors.dayName?.message}
                      {...register('dayName')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Start Time *</FormLabel>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopTimePicker
                className="hidden sm:block"
                inputFormat="HH:mm"
                mask="__:__"
                minutesStep={5}
                ampm={false}
                value={hourStart}
                onChange={(value) => onChangeTime(value, 'hourStart')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'startTime')}
                    helperText={errors.startTime?.message}
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
              <MobileTimePicker
                className="block sm:hidden"
                inputFormat="HH:mm"
                mask="__:__"
                minutesStep={5}
                ampm={false}
                value={hourStart}
                onChange={(value) => onChangeTime(value, 'hourStart')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'startTime')}
                    helperText={errors.startTime?.message}
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">End Time *</FormLabel>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopTimePicker
                className="hidden sm:block"
                inputFormat="HH:mm"
                mask="__:__"
                minutesStep={5}
                ampm={false}
                value={hourEnd}
                onChange={(value) => onChangeTime(value, 'hourEnd')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'endTime')}
                    helperText={errors.startTime?.message}
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
              <MobileTimePicker
                className="block sm:hidden"
                inputFormat="HH:mm"
                mask="__:__"
                minutesStep={5}
                ampm={false}
                value={hourEnd}
                onChange={(value) => onChangeTime(value, 'hourEnd')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'endTime')}
                    helperText={errors.startTime?.message}
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
      </form>
    </DialogForm>
  )
}

export default MappingProductForm
