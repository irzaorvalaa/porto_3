import * as React from 'react'
import {
  Autocomplete,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { DesktopTimePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import {
  initialGuestBookExternalFormdata,
  GuestBookExternalSchema,
} from './constants'
import {
  IGuestBookExternalFormData,
  IGuestBookExternalFormProps,
} from './interfaces'
import './GuestBookExternalForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import { FORMAT_DATE_POST, FORMAT_TIME_POST } from '../../../../../constants/Parameter'

const GuestBookExternalForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  identityOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IGuestBookExternalFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [identityType, setIdentityType] = React.useState<IFormDataOption | null>(identityOptions[0])
  const [campus, setCampus] = React.useState<IGeneralFetch | null>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IGuestBookExternalFormData>({
    defaultValues: initialGuestBookExternalFormdata,
    resolver: yupResolver(GuestBookExternalSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    
    if (defaultValue?.id)
    {
      const selectedCampus = campusOptions.find((item) => item.id === defaultValue?.campusId)
      setCampus(selectedCampus || null)
      setValue('campusId', selectedCampus?.id)
      setValue('campusName', selectedCampus?.label)

      const selectedType = identityOptions.find((item) => item.value === defaultValue?.identityType)
      setIdentityType(selectedType || null)
      setValue('identityType', selectedType?.value)
    }
    else
    {
      setIdentityType(null)
      setValue('identityType', 'KTP')
    }
    
    setValue('id', defaultValue?.id)
    setValue('identityNumber', defaultValue?.identityNumber)
    setValue('name', defaultValue?.name)
    setValue('email', defaultValue?.email)
    setValue('institutionName', defaultValue?.institutionName)
    setValue('phoneNumber', defaultValue?.phoneNumber)
    setValue('needs', defaultValue?.needs)
    autoFocusRef.current?.focus()
  }


  const onExit = () => {
    setIdentityType(null)
    setCampus(null)
    reset(initialGuestBookExternalFormdata)
  }

  const onSubmit = (values: IGuestBookExternalFormData) => {
    const postData: IGuestBookExternalFormData = {
      ...values,
      campusId : campus?.id,
      campusName : campus?.label,
    }
    onConfirm?.(postData)
  }

  const getTitle = () => {
    const title = 'Guestbook'

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
              name="campusId"
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
                      error={isFieldError(errors, 'campusId')}
                      helperText={errors.campusId?.message}
                      {...register('campusId')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Name *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'name')}
              helperText={errors.name?.message}
              {...register('name')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Institution *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'institutionName')}
              helperText={errors.institutionName?.message}
              {...register('institutionName')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Email</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'email')}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Phone Number</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'phoneNumber')}
              helperText={errors.phoneNumber?.message}
              {...register('phoneNumber')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Identity Type *</FormLabel>
            <Controller
              control={control}
              name="identityType"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={identityType}
                  options={identityOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setIdentityType(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select" 
                      size="small"
                      error={isFieldError(errors, 'identityType')}
                      helperText={errors.identityType?.message}
                      {...register('identityType')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Identity Number *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'identityNumber')}
              helperText={errors.identityNumber?.message}
              {...register('identityNumber')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Needs *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'needs')}
              helperText={errors.needs?.message}
              {...register('needs')}
            />
          </FormControl>
        </div>
        
      </form>
    </DialogForm>
  )
}

export default GuestBookExternalForm
