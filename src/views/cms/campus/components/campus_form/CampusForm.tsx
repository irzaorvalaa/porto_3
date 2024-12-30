import * as React from 'react'
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DesktopTimePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import {
  ALLOWED_IMAGE_TYPE,
  FORMAT_TIME_POST,
  MAX_IMAGE_FILESIZE,
  MAX_IMAGE_SIZETEXT,
} from '../../../../../constants/Parameter'
import isFieldError from '../../../../../utilities/isFieldError'
import { IFormDataOption } from '../../../../../interfaces/IFormData'
import { IBECampusDetail } from '../../../../../interfaces/ICampus'
import { invalidMaxSizeFile, invalidMimetypeFile } from '../../../../../constants/ErrorMessage'
import {
  initialCampusFormdata,
  campusSchema,
  campusProvideLockerOptions,
  campusDayOptions,
} from './constants'
import {
  ICampusFormData,
  ICampusFormProps,
  ICampusPICFormData,
  ICampusServiceHourFormData,
  ICampusTime,
} from './interfaces'
import './CampusForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { ReactComponent as AddIcon } from '../../../../../assets/svg/icons/add.svg'
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'
import { ReactComponent as PlusIcon } from '../../../../../assets/svg/icons/outline-plus.svg'
import { IUserManagementLookup } from '../../../../setting/user_management/interfaces'

const CampusForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  onConfirm,
  onClose,
  onOpen,
  onLookupBinusian,
  ...other
}: ICampusFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const firstKey = uuidv4()
  const [keys, setKeys] = React.useState<string[]>([firstKey])
  const [selectedProvideLocker, setSelectedProvideLocker] = React.useState<IFormDataOption | null>(
    null,
  )
  const [selectedDays, setSelectedDays] = React.useState<(IFormDataOption | null)[]>([null])
  const [hourStart, setHourStart] = React.useState<ICampusTime>({ [`${firstKey}`]: null })
  const [hourEnd, setHourEnd] = React.useState<ICampusTime>({ [`${firstKey}`]: null })
  const [detail, setDetail] = React.useState<IBECampusDetail | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [lookupData, setLookupData] = React.useState<IUserManagementLookup | null>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ICampusFormData>({
    defaultValues: initialCampusFormdata,
    resolver: yupResolver(campusSchema),
  })
  const watchFileName = watch('fileName')

  const {
    fields: fieldsSeriveHour,
    append: appendFieldServiceHour,
    remove: removeFieldSeriveHour,
  } = useFieldArray({ control, name: 'serviceHour' })

  const {
    fields: fieldsPIC,
    append: appendFieldPIC,
    remove: removeFieldPIC,
  } = useFieldArray({ control, name: 'pic' })

  const appendServiceHour = (day: IFormDataOption | null, start: Date | null, end: Date | null) => {
    const startValue = moment(start).format(FORMAT_TIME_POST)
    const endValue = moment(end).format(FORMAT_TIME_POST)
    appendFieldServiceHour({
      day: day ? day.value : '',
      hourStart: start ? startValue : '',
      hourEnd: end ? endValue : '',
    })

    const newKey = uuidv4()
    setKeys((prev) => [...prev, newKey])
    setSelectedDays((prev) => [...prev, day])
    setHourStart((prev) => ({ ...prev, [`${newKey}`]: start }))
    setHourEnd((prev) => ({ ...prev, [`${newKey}`]: end }))
  }

  const removeServiceHour = (index: number) => {
    removeFieldSeriveHour(index)

    const filterDays = selectedDays.filter((_, i) => i !== index)
    setSelectedDays(filterDays)

    const key = keys[index]

    const currentHourStart = hourStart
    delete currentHourStart[key]
    setHourStart(currentHourStart)

    const currentHourEnd = hourEnd
    delete currentHourEnd[key]
    setHourEnd(currentHourEnd)

    const filterKeys = keys.filter((v) => v !== key)
    setKeys(filterKeys)
  }

  const appendPIC = (userID: string, binusianID: string, name: string, email: string) => {
    appendFieldPIC({ userID, binusianID, name, email })
  }

  const prepareValue = (campus: IBECampusDetail) => {
    setValue('id', campus.id)
    setValue('name', campus.name)
    setValue('email', campus.email)
    setValue('phoneNumberWA', campus.phoneNumberWA)
    setValue('phoneNumberExt', campus.phoneNumberExt)
    setValue('address', campus.address ?? '')
    setValue('provideLockerBorrowing', campus.provideLockerBorrowing)

    const selectedLocker = campusProvideLockerOptions.find(
      (item) => item.value === campus.provideLockerBorrowing,
    )
    setSelectedProvideLocker(selectedLocker || null)

    if (campus.serviceHours.length > 0) {
      campus.serviceHours.forEach((hour, index) => {
        const selectedDay = campusDayOptions.find((day) => day.value === hour.dayName)
        const startDate = moment().format(`YYYY-MM-DD ${hour.startTime}`)
        const endDate = moment().format(`YYYY-MM-DD ${hour.endTime}`)

        if (index > 0) {
          appendServiceHour(selectedDay || null, new Date(startDate), new Date(endDate))
        } else {
          setValue(`serviceHour.${index}.day`, hour.dayName)
          setValue(`serviceHour.${index}.hourStart`, hour.startTime)
          setValue(`serviceHour.${index}.hourEnd`, hour.endTime)

          if (selectedDay) onChangeDay(selectedDay, index)

          onChangeTime(new Date(startDate), index, 'hourStart')
          onChangeTime(new Date(endDate), index, 'hourEnd')
        }
      })
    }

    if (campus.picAssignations.length > 0) {
      campus.picAssignations.forEach((pic, index) => {
        if (index > 0) {
          appendPIC(pic.userId, pic.binusianId, pic.name, pic.email)
        } else {
          setValue(`pic.${index}.userID`, pic.userId)
          setValue(`pic.${index}.binusianID`, pic.binusianId)
          setValue(`pic.${index}.name`, pic.name)
          setValue(`pic.${index}.email`, pic.email)
        }
      })
    }
  }

  const handleLookupBinusian = (index: number) => {
    const watchBinusianID = watch(`pic.${index}.binusianID`)
    if (onLookupBinusian && watchBinusianID) {
      clearErrors(`pic.${index}.binusianID`)

      onLookupBinusian(watchBinusianID, (data, error) => {
        if (data) {
          setLookupData(data)

          setValue(`pic.${index}.userID`, data.id)
          setValue(`pic.${index}.binusianID`, data.binusianID)
          setValue(`pic.${index}.name`, data.name)
          setValue(`pic.${index}.email`, data.email)
        }
        if (error) {
          setError(`pic.${index}.binusianID`, { message: error })
        }
      })
    }
  }

  const onEnter = () => {
    setValue('action', defaultValue ? 'Edit' : 'Add')

    if (defaultValue && onOpen) {
      if (detail && detail.id === defaultValue.id) {
        prepareValue(detail)
      } else {
        setLoading(true)
        onOpen(defaultValue, (campus) => {
          setDetail(campus)
          prepareValue(campus)
          setLoading(false)
        })
      }
    }

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    const newKey = uuidv4()
    setKeys([newKey])
    setSelectedProvideLocker(null)
    setSelectedDays([null])
    setHourStart({ [`${newKey}`]: null })
    setHourEnd({ [`${newKey}`]: null })
    reset(initialCampusFormdata)
  }

  const onSubmit = (values: ICampusFormData) => {
    const serviceDay: string[] = selectedDays.map((day) => (day ? day.value : ''))
    const serviceHourStart: string[] = Object.values(hourStart).map((hour) =>
      moment(hour).format('HH:mm'),
    )
    const serviceHourEnd: string[] = Object.values(hourEnd).map((hour) =>
      moment(hour).format('HH:mm'),
    )
    const picValues = values.pic || []
    const picUserID: string[] = picValues.map((pic) => pic.userID)
    const picBinusianID: string[] = picValues.map((pic) => pic.binusianID)
    const picName: string[] = picValues.map((pic) => pic.name)
    const picEmail: string[] = picValues.map((pic) => pic.email)

    const postData: ICampusFormData = {
      ...values,
      serviceDay: serviceDay.filter((day) => day !== ''),
      serviceHourStart,
      serviceHourEnd,
      picBinusianID,
      picUserID,
      picName,
      picEmail,
    }

    setDetail(null)

    if (onConfirm) onConfirm(postData)
  }

  const getTitle = () => {
    const title = 'Campus'

    if (type === 'edit') {
      return 'Edit '.concat(title)
    }

    return 'Add '.concat(title)
  }

  const getFieldServiceHourErrorMessage = (
    index: number,
    field: keyof ICampusServiceHourFormData,
  ) => {
    if (errors.serviceHour && errors.serviceHour[index]) {
      const fieldError = errors.serviceHour[index]
      switch (field) {
        case 'day':
          return fieldError?.day?.message
        case 'hourStart':
          return fieldError?.hourStart?.message
        case 'hourEnd':
          return fieldError?.hourEnd?.message
        default:
          return null
      }
    }

    return null
  }

  const getFieldPICErrorMessage = (index: number, field: keyof ICampusPICFormData) => {
    if (errors.pic && errors.pic[index]) {
      const fieldError = errors.pic[index]
      switch (field) {
        case 'binusianID':
          return fieldError?.binusianID?.message
        case 'name':
          return fieldError?.name?.message
        case 'email':
          return fieldError?.email?.message
        default:
          return null
      }
    }

    return null
  }

  const onChangeDay = (value: IFormDataOption | null, index: number) => {
    const currentDays = selectedDays
    currentDays[index] = value

    setSelectedDays(currentDays)
  }

  const onChangeTime = (value: Date | null, index: number, field: 'hourStart' | 'hourEnd') => {
    const key = keys[index]

    if (field === 'hourStart') {
      setHourStart((prev) => ({ ...prev, [`${key}`]: value }))
    } else {
      setHourEnd((prev) => ({ ...prev, [`${key}`]: value }))
    }

    setValueTime(value || '', index, field)
  }

  const setValueTime = (value: Date | string, index: number, field: 'hourStart' | 'hourEnd') => {
    const newValue = moment(value).format(FORMAT_TIME_POST)
    setValue(`serviceHour.${index}.${field}`, newValue)
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const file = files[0]

      if (!ALLOWED_IMAGE_TYPE.includes(file.type)) {
        setValue('fileData', '')

        setError('fileData', { message: invalidMimetypeFile })

        return
      } else {
        clearErrors('fileData')
      }

      if (file.size > MAX_IMAGE_FILESIZE) {
        setValue('fileData', '')

        setError('fileData', {
          message: `${invalidMaxSizeFile}. (Max: ${MAX_IMAGE_SIZETEXT})`,
        })

        return
      } else {
        clearErrors('fileData')
      }

      setValue('fileName', file.name)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setValue('fileData', reader.result as string)
      }
    }
  }

  return (
    <DialogForm
      open={open}
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
        <div className="campus-location-form__formwrapper">
          <FormControl fullWidth margin="dense">
            {detail && detail.photoUrl && (
              <div className="campus-location-form__image">
                <img src={detail.photoUrl} />
              </div>
            )}
            <div className="campus-location-form__upload">
              <Button
                variant="outlined"
                component="label"
                disableElevation
                className="campus-location-form__buttonupload"
              >
                <PlusIcon className="campus-location-form__plusicon" />
                <span>Choose Photo</span>
                <input
                  hidden
                  accept={ALLOWED_IMAGE_TYPE.join(',')}
                  type="file"
                  onChangeCapture={handleUpload}
                />
              </Button>
            </div>
            <div>{watchFileName}</div>
            {isFieldError(errors, 'fileName') && (
              <FormHelperText error={isFieldError(errors, 'fileName')}>
                {errors.fileName?.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl />
        </div>
        <div className="campus-location-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Campus ID *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'id')}
              helperText={errors.id?.message}
              InputProps={{
                startAdornment: loading ? (
                  <InputAdornment position="start">
                    <Skeleton width={100} />
                  </InputAdornment>
                ) : null,
              }}
              {...register('id')}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Campus Name *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'name')}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: loading ? (
                  <InputAdornment position="start">
                    <Skeleton width={100} />
                  </InputAdornment>
                ) : null,
              }}
              {...register('name')}
            />
          </FormControl>
        </div>
        <div className="campus-location-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Phone Number (WA)</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'phoneNumberWA')}
              helperText={errors.phoneNumberWA?.message}
              InputProps={{
                startAdornment: loading ? (
                  <InputAdornment position="start">
                    <Skeleton width={100} />
                  </InputAdornment>
                ) : null,
              }}
              {...register('phoneNumberWA')}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Phone Number (Ext)</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'phoneNumberExt')}
              helperText={errors.phoneNumberExt?.message}
              InputProps={{
                startAdornment: loading ? (
                  <InputAdornment position="start">
                    <Skeleton width={100} />
                  </InputAdornment>
                ) : null,
              }}
              {...register('phoneNumberExt')}
            />
          </FormControl>
        </div>
        <div className="campus-location-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Email</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'email')}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: loading ? (
                  <InputAdornment position="start">
                    <Skeleton width={100} />
                  </InputAdornment>
                ) : null,
              }}
              {...register('email')}
            />
          </FormControl>
          <div />
        </div>

        <FormControl fullWidth margin="dense">
          <FormLabel className="campus-location__formlabel">Service Operation *</FormLabel>
          {fieldsSeriveHour.map((field, index) => (
            <div
              key={field.id}
              className={`campus-location-form__servicehour ${index > 0 ? 'mt-4' : ''}`}
            >
              <Controller
                control={control}
                name={`serviceHour.${index}.day`}
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    value={selectedDays[index]}
                    options={campusDayOptions}
                    onChange={(_, newValue) => {
                      onChange(newValue?.value)
                      onChangeDay(newValue, index)
                    }}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Please select"
                        error={isFieldError(errors.serviceHour, 'day', index)}
                        helperText={getFieldServiceHourErrorMessage(index, 'day')}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: loading ? (
                            <InputAdornment position="start">
                              <Skeleton width={100} />
                            </InputAdornment>
                          ) : (
                            params.InputProps.startAdornment
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
              <div className="campus-location-form__hourswrapper">
                <div className="campus-location-form__hours">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopTimePicker
                      className="hidden sm:block"
                      inputFormat="HH:mm"
                      mask="__:__"
                      minutesStep={5}
                      ampm={false}
                      value={hourStart[keys[index]]}
                      onChange={(value) => onChangeTime(value, index, 'hourStart')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          error={isFieldError(errors.serviceHour, 'hourStart', index)}
                          helperText={getFieldServiceHourErrorMessage(index, 'hourStart')}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: loading ? (
                              <InputAdornment position="start">
                                <Skeleton width={100} />
                              </InputAdornment>
                            ) : (
                              params.InputProps?.startAdornment
                            ),
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
                      value={hourStart[keys[index]]}
                      onChange={(value) => onChangeTime(value, index, 'hourStart')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          error={isFieldError(errors.serviceHour, 'hourStart', index)}
                          helperText={getFieldServiceHourErrorMessage(index, 'hourStart')}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: loading ? (
                              <InputAdornment position="start">
                                <Skeleton width={100} />
                              </InputAdornment>
                            ) : (
                              params.InputProps?.startAdornment
                            ),
                          }}
                        />
                      )}
                    />
                    <DesktopTimePicker
                      className="hidden sm:block"
                      inputFormat="HH:mm"
                      mask="__:__"
                      minutesStep={5}
                      ampm={false}
                      value={hourEnd[keys[index]]}
                      onChange={(value) => onChangeTime(value, index, 'hourEnd')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          error={isFieldError(errors.serviceHour, 'hourEnd', index)}
                          helperText={getFieldServiceHourErrorMessage(index, 'hourEnd')}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: loading ? (
                              <InputAdornment position="start">
                                <Skeleton width={100} />
                              </InputAdornment>
                            ) : (
                              params.InputProps?.startAdornment
                            ),
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
                      value={hourEnd[keys[index]]}
                      onChange={(value) => onChangeTime(value, index, 'hourEnd')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          error={isFieldError(errors.serviceHour, 'hourEnd', index)}
                          helperText={getFieldServiceHourErrorMessage(index, 'hourEnd')}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: loading ? (
                              <InputAdornment position="start">
                                <Skeleton width={100} />
                              </InputAdornment>
                            ) : (
                              params.InputProps?.startAdornment
                            ),
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  {index === 0 ? (
                    <IconButton
                      color="secondary"
                      size="medium"
                      onClick={() => appendServiceHour(null, null, null)}
                    >
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="error"
                      size="medium"
                      onClick={() => removeServiceHour(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </FormControl>
        <FormControl fullWidth margin="dense">
          <FormLabel className="campus-location__formlabel">PIC *</FormLabel>
          <div>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              className="button button--secondary campus-location-form__buttonadd"
              onClick={() => appendPIC('', '', '', '')}
            >
              ADD PIC
            </Button>
          </div>
          {fieldsPIC.map((field, index) => (
            <div
              key={field.id}
              className={`campus-location-form__formpic ${index > 0 ? 'mt-4' : ''}`}
            >
              <div className="campus-location-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="campus-location__formlabel">PIC Binusian ID *</FormLabel>
                  <TextField
                    size="small"
                    placeholder="Type here"
                    error={isFieldError(errors.pic, 'binusianID', index)}
                    helperText={getFieldPICErrorMessage(index, 'binusianID')}
                    InputProps={{
                      startAdornment: loading ? (
                        <InputAdornment position="start">
                          <Skeleton width={100} />
                        </InputAdornment>
                      ) : null,
                      onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                          handleLookupBinusian(index)
                        }
                      },
                      onBlur: (e) => {
                        if (e.target.value !== lookupData?.binusianID) {
                          handleLookupBinusian(index)
                        }
                      },
                    }}
                    {...register(`pic.${index}.binusianID`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="campus-location-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="campus-location__formlabel">PIC Name</FormLabel>
                  <TextField
                    size="small"
                    placeholder="Generated"
                    disabled
                    error={isFieldError(errors.pic, 'name', index)}
                    helperText={getFieldPICErrorMessage(index, 'name')}
                    InputProps={{
                      startAdornment: loading ? (
                        <InputAdornment position="start">
                          <Skeleton width={100} />
                        </InputAdornment>
                      ) : null,
                    }}
                    {...register(`pic.${index}.name`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="campus-location-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="campus-location__formlabel">PIC Email</FormLabel>
                  <TextField
                    size="small"
                    placeholder="Generated"
                    disabled
                    error={isFieldError(errors.pic, 'email', index)}
                    helperText={getFieldPICErrorMessage(index, 'email')}
                    InputProps={{
                      startAdornment: loading ? (
                        <InputAdornment position="start">
                          <Skeleton width={100} />
                        </InputAdornment>
                      ) : null,
                    }}
                    {...register(`pic.${index}.email`)}
                  />
                </FormControl>
                <div />
              </div>
              {index > 0 && (
                <div className="campus-location-form__buttondelete">
                  <IconButton color="error" size="medium" onClick={() => removeFieldPIC(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          ))}
        </FormControl>
        <div className="campus-location-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Address *</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'address')}
              helperText={errors.address?.message}
              InputProps={{
                startAdornment: loading ? (
                  <InputAdornment position="start">
                    <Skeleton width={100} />
                  </InputAdornment>
                ) : null,
              }}
              {...register('address')}
            />
          </FormControl>
          <div />
        </div>
        <div className="campus-location-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="campus-location__formlabel">Provide Locker Borrowing *</FormLabel>
            <Controller
              control={control}
              name="provideLockerBorrowing"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={selectedProvideLocker}
                  options={campusProvideLockerOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setSelectedProvideLocker(newValue)
                  }}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Please select"
                      error={isFieldError(errors, 'provideLockerBorrowing')}
                      helperText={errors.provideLockerBorrowing?.message}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: loading ? (
                          <InputAdornment position="start">
                            <Skeleton width={100} />
                          </InputAdornment>
                        ) : (
                          params.InputProps.startAdornment
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </FormControl>
          <div />
        </div>
      </form>
    </DialogForm>
  )
}

export default CampusForm
