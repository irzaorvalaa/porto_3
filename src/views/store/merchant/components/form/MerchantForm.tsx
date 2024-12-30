import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { initialMerchantFormdata, MerchantSchema } from './constants'
import { IMerchantFormData, IMerchantFormProps } from './interfaces'
import './MerchantForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const MerchantForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IMerchantFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])
  const [idDisabled, setIDDisabled] = React.useState<boolean>(false)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IMerchantFormData>({
    defaultValues: initialMerchantFormdata,
    resolver: yupResolver(MerchantSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setIDDisabled(defaultValue?.id != undefined ? true : false)
    setValue('id', defaultValue?.id)
    setValue('name', defaultValue?.name)
    setValue('city', defaultValue?.city)
    setValue('phoneNumber', defaultValue?.phoneNumber)
    setValue('email', defaultValue?.email)
    setValue('address', defaultValue?.address)
    setValue('sharedUsername', defaultValue?.sharedUsername)
    setValue('sharedPassword', defaultValue?.sharedPassword)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setIDDisabled(false)
    reset(initialMerchantFormdata)
  }

  const onSubmit = (values: IMerchantFormData) => {
    setValue('id', values?.id?.toUpperCase())
    const postData: IMerchantFormData = {
      ...values,
      id: values.id?.toUpperCase(),
    }
    onConfirm?.(postData)
  }

  const getTitle = () => {
    const title = 'Merchant'

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
            <FormLabel className="complex-form__formlabel">City *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'city')}
              helperText={errors.city?.message}
              {...register('city')}
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
            <FormLabel className="complex-form__formlabel">Address</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'address')}
              helperText={errors.address?.message}
              {...register('address')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Shared Username</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'sharedUsername')}
              helperText={errors.sharedUsername?.message}
              {...register('sharedUsername')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Shared Password</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'label')}
              helperText={errors.sharedPassword?.message}
              {...register('sharedPassword')}
            />
          </FormControl>
        </div>
      </form>
    </DialogForm>
  )
}

export default MerchantForm
