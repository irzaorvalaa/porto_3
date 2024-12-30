import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { initialBannerFormdata, BannerSchema } from './constants'
import { IBannerFormData, IBannerFormProps } from './interfaces'
import './BannerForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IBannerFormData>({
    defaultValues: initialBannerFormdata,
    resolver: yupResolver(BannerSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')

    setValue('id', defaultValue?.id)
    setValue('name', defaultValue?.name)
    setValue('scopeNote', defaultValue?.scopeNote)
    setValue('broaderTerm', defaultValue?.broaderTerm)
    setValue('narrowerTerm', defaultValue?.narrowerTerm)
    setValue('usedFor', defaultValue?.usedFor)
    setValue('relatedTerm', defaultValue?.relatedTerm)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setCampus([])
    reset(initialBannerFormdata)
  }

  const onSubmit = (values: IBannerFormData) => {
    onConfirm?.(values)
  }

  const getTitle = () => {
    const title = 'Collection Subject'

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
            <FormLabel className="complex-form__formlabel">Scope Note</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              error={isFieldError(errors, 'scopeNote')}
              helperText={errors.scopeNote?.message}
              {...register('scopeNote')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Broader Term (BT)</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              error={isFieldError(errors, 'broaderTerm')}
              helperText={errors.broaderTerm?.message}
              {...register('broaderTerm')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Narrower Term (NT)</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              error={isFieldError(errors, 'narrowerTerm')}
              helperText={errors.narrowerTerm?.message}
              {...register('narrowerTerm')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Used For (UF)</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              error={isFieldError(errors, 'narrowerTerm')}
              helperText={errors.narrowerTerm?.message}
              {...register('narrowerTerm')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Related Term</FormLabel>
            <TextField
              multiline
              minRows={3}
              size="small"
              error={isFieldError(errors, 'relatedTerm')}
              helperText={errors.relatedTerm?.message}
              {...register('relatedTerm')}
            />
          </FormControl>
        </div>
      </form>
    </DialogForm>
  )
}

export default BannerForm
