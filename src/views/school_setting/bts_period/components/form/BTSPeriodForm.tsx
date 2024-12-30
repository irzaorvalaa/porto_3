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
import { initialBTSPeriodFormdata, BTSPeriodSchema } from './constants'
import { IBTSPeriodFormData, IBTSPeriodFormProps } from './interfaces'
import './BTSPeriodForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'

const BTSPeriodForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IBTSPeriodFormProps) => {
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
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IBTSPeriodFormData>({
    defaultValues: initialBTSPeriodFormdata,
    resolver: yupResolver(BTSPeriodSchema),
  })

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setValue('id', defaultValue?.id)
    setValue('label', defaultValue?.label)

    if (defaultValue?.id) {
      let selectedCampus = defaultValue.campusLocation
        ? defaultValue.campusLocation.map((x) => ({ id: x.campusId, label: x.campusName }))
        : []
      if (selectedCampus.find((x) => x.id == 'All')) {
        setValue('selAllCampus', 'T')
        selectedCampus = selectedCampus?.filter((x) => x.id != 'All')
      }
      setCampus(selectedCampus)
      setValue(
        'campusID',
        selectedCampus.map((x) => x.id),
      )
    }

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setCampus([])
    reset(initialBTSPeriodFormdata)
  }

  const onSubmit = (values: IBTSPeriodFormData) => {
    const campusID: string[] = campus.map((x) => x.id)
    const campusName: string[] = campus.map((x) => x.label)
    const postData: IBTSPeriodFormData = {
      ...values,
      campusID,
      campusName,
    }
    onConfirm?.(postData)
  }

  const handleSetAllCampus = () => {
    setValue('selAllCampus', watch('selAllCampus') == 'T' ? 'F' : 'T')
  }

  const getTitle = () => {
    const title = 'Topic'

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
            <FormLabel className="complex-form__formlabel">Campus *</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleSetAllCampus}
                    checked={watch('selAllCampus') == 'T' ? true : false}
                  />
                }
                label="All Campus"
              />
            </FormGroup>
            {watch('selAllCampus') == 'F' && (
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
      </form>
    </DialogForm>
  )
}

export default BTSPeriodForm
