import * as React from 'react'
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { v4 as uuidv4 } from 'uuid'
import {
  ALLOWED_IMAGE_TYPE,
  FORMAT_TIME_POST,
  MAX_IMAGE_FILESIZE,
  MAX_IMAGE_SIZETEXT,
} from '../../../../../constants/Parameter'
import { invalidMaxSizeFile, invalidMimetypeFile } from '../../../../../constants/ErrorMessage'
import {
  initialAnnouncementFormdata,
  AnnouncementSchema,
} from './constants'
import {
  IAnnouncementFormData,
  IAnnouncementFormProps,
} from './interfaces'
import 'react-quill/dist/quill.snow.css'
import './AnnouncementForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactComponent as PlusIcon } from '../../../../../assets/svg/icons/outline-plus.svg'
import ReactQuill from 'react-quill'
import { formats, modules } from '../../../../../constants/QuillEditor'

const AnnouncementForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IAnnouncementFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const firstKey = uuidv4()
  const [keys, setKeys] = React.useState<string[]>([firstKey])
  const [startDate, setStartDate] = React.useState<null | Date>(null)
  const [endDate, setEndDate] = React.useState<null | Date>(null)
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IAnnouncementFormData>({
    defaultValues: initialAnnouncementFormdata,
    resolver: yupResolver(AnnouncementSchema),
  })
  const watchFileName = watch('fileName')

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setValue('id', defaultValue?.id)
    setValue('title', defaultValue?.title)
    setValue('description', defaultValue?.description)

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

    autoFocusRef.current?.focus()
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

  const handleSetAllCampus = () => {
    setValue('selAllCampus',watch('selAllCampus')=='T' ? 'F' : 'T')
}

  const onExit = () => {
    setCampus([])
    reset(initialAnnouncementFormdata)
  }

  const onSubmit = (values: IAnnouncementFormData) => {
    const campusID: string[] = campus.map((x) => x.id)
    const campusName: string[] = campus.map((x) => x.label)
    const postData: IAnnouncementFormData = {
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


  const getTitle = () => {
    const title = 'Announcement'

    if (type === 'edit') {
      return 'Edit '.concat(title)
    }

    return 'Add '.concat(title)
  }

  return (
    <DialogForm
      open={open}
      title={getTitle()}
      size="xs"
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
          {defaultValue && defaultValue.photoUrl && (
            <div className="complex-form__image">
              <img src={defaultValue.photoUrl} />
            </div>
          )}
          <div className="complex-form__upload">
            <Button
              variant="outlined"
              component="label"
              disableElevation
              className="complex-form__buttonupload"
            >
              <PlusIcon className="complex-form__plusicon" />
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
      <div className="complex-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Start Date *</FormLabel>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              showDaysOutsideCurrentMonth
              className="hidden sm:block"
              mask="__/__/____"
              // minDate={new Date()}
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
              // minDate={new Date()}
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
                // minDate={new Date()}
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
                // minDate={new Date()}
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
          <FormLabel className="complex-form__formlabel">Title *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'title')}
            helperText={errors.title?.message}
            {...register('title')}
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
        <div className="complex-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Description</FormLabel>
          <div data-text-editor="quill-text-editor">
                <ReactQuill
                  bounds={'[data-text-editor="quill-text-editor"]'}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={watch('description')}
                  onChange={(value) => setValue('description', value)}
                />
              </div>
              {isFieldError(errors, 'description') && (
                <FormHelperText error={isFieldError(errors, 'description')}>
                  {errors.description?.message}
                </FormHelperText>
              )}
        </FormControl>
      </div>
    </form>
  </DialogForm>
  )
}

export default AnnouncementForm
