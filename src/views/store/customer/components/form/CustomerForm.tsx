import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { initialCustomerFormdata, CustomerSchema } from './constants'
import { ICustomerFormData, ICustomerFormProps } from './interfaces'
import './CustomerForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const CustomerForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: ICustomerFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<ICustomerFormData>({
    defaultValues: initialCustomerFormdata,
    resolver: yupResolver(CustomerSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')

    setValue('id', defaultValue?.id)
    setValue('name', defaultValue?.name)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    reset(initialCustomerFormdata)
  }

  const onSubmit = (values: ICustomerFormData) => {
    onConfirm?.(values)
  }

  const getTitle = () => {
    const title = 'Supplement'

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
      </form>
    </DialogForm>
  )
}

export default CustomerForm
