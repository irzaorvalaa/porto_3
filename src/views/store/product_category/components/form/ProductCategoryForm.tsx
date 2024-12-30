import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { initialProductCategoryFormdata, ProductCategorySchema } from './constants'
import { IProductCategoryFormData, IProductCategoryFormProps } from './interfaces'
import './ProductCategoryForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const ProductCategoryForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IProductCategoryFormProps) => {
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
  } = useForm<IProductCategoryFormData>({
    defaultValues: initialProductCategoryFormdata,
    resolver: yupResolver(ProductCategorySchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setIDDisabled(defaultValue?.id != undefined ? true : false)
    setValue('id', defaultValue?.id)
    setValue('label', defaultValue?.label)
    setValue('topic', defaultValue?.topic)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setIDDisabled(false)
    reset(initialProductCategoryFormdata)
  }

  const onSubmit = (values: IProductCategoryFormData) => {
    setValue('id', values?.id?.toUpperCase())
    const postData: IProductCategoryFormData = {
      ...values,
      id: values.id?.toUpperCase(),
    }
    onConfirm?.(postData)
  }

  const getTitle = () => {
    const title = 'ProductCategory'

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
            <FormLabel className="complex-form__formlabel">ProductCategory No. *</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              error={isFieldError(errors, 'id')}
              helperText={errors.id?.message}
              disabled={idDisabled}
              {...register('id')}
            />
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
            <FormLabel className="complex-form__formlabel">Topic (separate by comma)</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              error={isFieldError(errors, 'topic')}
              helperText={errors.topic?.message}
              {...register('topic')}
            />
          </FormControl>
        </div>
      </form>
    </DialogForm>
  )
}

export default ProductCategoryForm
