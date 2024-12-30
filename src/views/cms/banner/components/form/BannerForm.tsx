import * as React from 'react'
import {
  Autocomplete,
  Button,
  FormControl,
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
  initialBannerFormdata,
  BannerSchema,
} from './constants'
import {
  IBannerFormData,
  IBannerFormProps,
} from './interfaces'
import './BannerForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactComponent as PlusIcon } from '../../../../../assets/svg/icons/outline-plus.svg'
import InputNumberFormat from '../../../../../components/input_number_format'

const BannerForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IBannerFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const firstKey = uuidv4()
  const [keys, setKeys] = React.useState<string[]>([firstKey])
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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IBannerFormData>({
    defaultValues: initialBannerFormdata,
    resolver: yupResolver(BannerSchema),
  })
  const watchFileName = watch('fileName')

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setValue('id', defaultValue?.id)
    setValue('headline', defaultValue?.headline)
    setValue('externalUrl', defaultValue?.externalUrl)
    setValue('caption', defaultValue?.caption)
    setValue('sequenceNo', defaultValue?.sequenceNo)
    if (defaultValue?.id)
    {
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

  const onExit = () => {
    reset(initialBannerFormdata)
  }

  const onSubmit = (values: IBannerFormData) => {
    onConfirm?.(values)
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
    const title = 'Banner'

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
        <FormControl margin="dense">
          <FormLabel className="complex-form__formlabel">Sequence No. *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'sequenceNo')}
            helperText={errors.sequenceNo?.message}
            InputProps={{
              inputComponent: InputNumberFormat as any,
              inputProps: {
                value: watch('sequenceNo'),
              },
            }}
            {...register('sequenceNo')}
          />
        </FormControl>
      </div>
      <div className="complex-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Headline / Title</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'headline')}
            helperText={errors.headline?.message}
            {...register('headline')}
          />
        </FormControl>
        </div>
        <div className="complex-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">External Url</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'externalUrl')}
            helperText={errors.externalUrl?.message}
            {...register('externalUrl')}
          />
        </FormControl>
      </div>
      <div className="complex-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Caption</FormLabel>
          <TextField
            multiline
            minRows={3}
            size="small"
            error={isFieldError(errors, 'caption')}
            helperText={errors.caption?.message}
            {...register('caption')}
          />
        </FormControl>
        </div>
        
    </form>
  </DialogForm>
  )
}

export default BannerForm
