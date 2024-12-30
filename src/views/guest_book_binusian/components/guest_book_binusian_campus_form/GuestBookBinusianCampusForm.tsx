import * as React from 'react'
import { Autocomplete, FormControl, FormLabel, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isFieldError from '../../../../utilities/isFieldError'
import { IGeneralFetch } from '../../../../interfaces/IGeneralFetch'
import { initialGuestBookBinusianCampusFormdata, guestBookBinusianCampusSchema } from './constants'
import { IGuestBookBinusianCampusFormData, IGuestBookBinusianCampusFormProps } from './interfaces'
import './GuestBookBinusianCampusForm.scss'

// Components
import DialogForm from '../../../../components/dialog_form'
import { IBECampus } from '../../../../interfaces/ICampus'

const GuestBookBinusianCampusForm = ({
  open = false,
  campusOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IGuestBookBinusianCampusFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [selectedCampus, setSelectedCampus] = React.useState<IBECampus | null>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IGuestBookBinusianCampusFormData>({
    defaultValues: initialGuestBookBinusianCampusFormdata,
    resolver: yupResolver(guestBookBinusianCampusSchema),
  })

  const onEnter = () => {
    setValue('campus', defaultValue?.id ?? '')
    setSelectedCampus(defaultValue)
    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setSelectedCampus(null)
    reset(initialGuestBookBinusianCampusFormdata)
  }

  const onSubmit = () => {
    if (onConfirm && selectedCampus) onConfirm(selectedCampus)
  }

  return (
    <DialogForm
      open={open}
      title="Campus Setting"
      size="sm"
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
        <FormControl fullWidth margin="dense">
          <FormLabel className="guestbook-binusian__formlabel">Campus *</FormLabel>
          <Controller
            control={control}
            name="campus"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedCampus}
                options={campusOptions}
                onChange={(_, newValue) => {
                  onChange(newValue?.id)
                  setSelectedCampus(newValue)
                }}
                getOptionLabel={(option) => option.name || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    ref={autoFocusRef}
                    size="small"
                    error={isFieldError(errors, 'campus')}
                    helperText={errors.campus?.message}
                  />
                )}
              />
            )}
          />
        </FormControl>
      </form>
    </DialogForm>
  )
}

export default GuestBookBinusianCampusForm
