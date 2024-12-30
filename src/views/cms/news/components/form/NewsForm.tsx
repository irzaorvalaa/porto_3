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
  initialNewsFormdata,
  NewsSchema,
} from './constants'
import {
  INewsFormData,
  INewsFormProps,
} from './interfaces'
import 'react-quill/dist/quill.snow.css'
import './NewsForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactComponent as PlusIcon } from '../../../../../assets/svg/icons/outline-plus.svg'
import ReactQuill from 'react-quill'
import { formats, modules } from '../../../../../constants/QuillEditor'

const NewsForm = ({
  open = false,
  type = 'add',
  categoryOptions = [],
  campusOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: INewsFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const firstKey = uuidv4()
  const [keys, setKeys] = React.useState<string[]>([firstKey])
  const [publishDate, setPublishDate] = React.useState<null | Date>(new Date())
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])
  const [category, setCategory] = React.useState<IFormDataOption | null>(null)

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
  } = useForm<INewsFormData>({
    defaultValues: initialNewsFormdata,
    resolver: yupResolver(NewsSchema),
  })
  const watchFileName = watch('fileName')

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setValue('id', defaultValue?.id)
    setValue('title', defaultValue?.title)
    setValue('isEvent', defaultValue ? defaultValue?.isEvent : 'F')
    setValue('author', defaultValue?.author)
    setValue('caption', defaultValue?.caption)
    setValue('description', defaultValue?.description)

    const selectedCategory = categoryOptions.find((item) => item.value === defaultValue?.isEvent)
    setCategory(selectedCategory || categoryOptions[0])

    if (defaultValue?.id)
    {
      let selectedCampus = defaultValue.campusLocation ? defaultValue.campusLocation.map((x) => ({ id: x.campusId, label: x.campusName })) : []
      if (selectedCampus.find(x => x.id == 'All')) {
        setValue('selAllCampus','T')
        selectedCampus = selectedCampus?.filter((x) => x.id != 'All')
      }
      setCampus(selectedCampus)
      setValue('campusID', selectedCampus.map((x) => x.id))

      const dtDate = moment(defaultValue?.date)
      if (dtDate.isValid()) {
        setPublishDate(moment(defaultValue?.date).toDate())
        setValueDate(defaultValue?.date ? defaultValue?.date : '')
      }
    }
    else
    {
      setPublishDate(moment(new Date()).toDate())
      setValueDate(new Date())
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
    reset(initialNewsFormdata)
  }

  const onSubmit = (values: INewsFormData) => {
    const campusID: string[] = campus.map((x) => x.id)
    const campusName: string[] = campus.map((x) => x.label)
    const postData: INewsFormData = {
      ...values,
      campusID,
      campusName,
      isEvent: watch('isEvent')=='Event' || watch('isEvent')=='T' ? 'T' : 'F',
    }
    onConfirm?.(postData)
  }

  const setValueDate = async (value: Date | string) => {
    if (value != '') {
      const newValue = moment(value).format(FORMAT_DATE_POST)

      setValue('date', newValue)
    } else {
      setValue('date', '')
    }
  }

  const onChangeDate = (value: Date | null) => {
    const date = moment(value)
    if (date.isValid()) {
      setPublishDate(value)
      setValueDate(value ? value : '')
    } else {
      setValueDate('')
    } 
  }

  const getTitle = () => {
    const title = 'News & Event'

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
          <FormLabel className="complex-form__formlabel">Category *</FormLabel>
          <Controller
            control={control}
            name="isEvent"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={category}
                options={categoryOptions}
                onChange={(_, newValue) => {
                  onChange(newValue?.value)
                  setCategory(newValue)
                }}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Please Select" 
                    size="small"
                    error={isFieldError(errors, 'isEvent')}
                    helperText={errors.isEvent?.message}
                    {...register('isEvent')}
                  />
                )}
              />
            )}
          />
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
          <FormLabel className="complex-form__formlabel">Publish Date *</FormLabel>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              showDaysOutsideCurrentMonth
              className="hidden sm:block"
              mask="__/__/____"
              inputFormat={FORMAT_DATE_INPUT}
              // minDate={new Date()}
              value={publishDate}
              onChange={onChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  error={isFieldError(errors, 'date')}
                  helperText={errors.date?.message}
                />
              )}
            />
            <MobileDatePicker
              showDaysOutsideCurrentMonth
              className="block sm:hidden"
              mask="__/__/____"
              inputFormat={FORMAT_DATE_INPUT}
              // minDate={new Date()}
              value={publishDate}
              onChange={onChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  error={isFieldError(errors, 'date')}
                  helperText={errors.date?.message}
                />
              )}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
      <div className="complex-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Author *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'author')}
            helperText={errors.author?.message}
            {...register('author')}
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
          <FormLabel className="complex-form__formlabel">Caption</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'caption')}
            helperText={errors.caption?.message}
            {...register('caption')}
          />
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

export default NewsForm
