import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { initialAddressFormdata, AddressSchema } from './constants'
import { IAddressFormData, IAddressFormProps } from './interfaces'
import './AddressEditForm.scss'

// Components
import DialogForm from '../../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const AddressEditForm = ({
  open = false,
  type = 'edit',
  typeOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IAddressFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])
  const [title, setTitle] = React.useState<IFormDataOption | null>(typeOptions[1])
  const [idDisabled, setIDDisabled] = React.useState<boolean>(false)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IAddressFormData>({
    defaultValues: initialAddressFormdata,
    resolver: yupResolver(AddressSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setIDDisabled(defaultValue?.id != undefined ? true : false)
    if (defaultValue?.id) {
      const selectedTitle = typeOptions.find((item) => item.value === defaultValue?.title)
      setTitle(selectedTitle || null)
    }
    setValue('id', defaultValue?.id)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setIDDisabled(false)
    reset(initialAddressFormdata)
  }

  const onSubmit = (values: IAddressFormData) => {
    setValue('id', values?.id?.toUpperCase())
    const postData: IAddressFormData = {
      ...values,
      id: values.id?.toUpperCase(),
    }
    onConfirm?.(postData)
  }

  const getTitle = () => {
    const title = 'Address'

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
              error={isFieldError(errors, 'label')}
              helperText={errors.label?.message}
              {...register('label')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Title *</FormLabel>
            <Controller
              control={control}
              name="isDigital"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={title}
                  options={typeOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setTitle(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select"
                      size="small"
                      error={isFieldError(errors, 'isDigital')}
                      helperText={errors.isDigital?.message}
                      {...register('isDigital')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
      </form>
    </DialogForm>
  )
}

export default AddressEditForm
