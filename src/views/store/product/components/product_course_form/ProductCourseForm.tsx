import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Autocomplete, Button, FormControl, FormLabel, TextField } from '@mui/material'
import { IProductCourseFormData, IProductCourseFormProps } from './interfaces'
import { masterCollectionCourseSchema, initialProductCourseFormdata } from './constants'
import isFieldError from '../../../../../utilities/isFieldError'
import { IFormDataOption } from '../../../../../interfaces/IFormData'
import { IProductFormCourseData } from '../product_form/interfaces'
import './ProductCourseForm.scss'

const ProductCourseForm = ({
  defaultValue = null,
  statusOptions = [],
  onSubmit,
  onClose,
}: IProductCourseFormProps) => {
  // State
  const [selectedStatus, setSelectedStatus] = React.useState<IFormDataOption | null>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IProductCourseFormData>({
    defaultValues: initialProductCourseFormdata,
    resolver: yupResolver(masterCollectionCourseSchema),
  })

  const onSave = (values: IProductCourseFormData) => {
    const formData: IProductFormCourseData = {
      id: defaultValue ? defaultValue.id : new Date().getTime().toString(),
      course: values.course ?? '',
      gugusMatkul: values.gugusMatkul ?? '',
      status: selectedStatus as IFormDataOption,
    }

    if (onSubmit) onSubmit(defaultValue ? 'Edit' : 'Add', formData)

    reset(initialProductCourseFormdata)
    setSelectedStatus(null)
  }

  React.useEffect(() => {
    setValue('course', defaultValue ? defaultValue.course : '')
    setValue('gugusMatkul', defaultValue ? defaultValue.gugusMatkul : '')
    setValue('status', defaultValue ? defaultValue.status.value : '')

    setSelectedStatus(defaultValue ? defaultValue.status : null)
  }, [defaultValue])

  return (
    <div className="collection-management-course-form__form">
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Course *</FormLabel>
          <TextField
            multiline
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'course')}
            helperText={errors.course?.message}
            {...register('course')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Field of Study *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'gugusMatkul')}
            helperText={errors.gugusMatkul?.message}
            {...register('gugusMatkul')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Status *</FormLabel>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedStatus}
                options={statusOptions}
                onChange={(_, newValue) => {
                  onChange(newValue?.value)
                  setSelectedStatus(newValue)
                }}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Please select"
                    error={isFieldError(errors, 'status')}
                    helperText={errors.status?.message}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-course-form__button">
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          className="button button--secondary"
          onClick={handleSubmit(onSave)}
        >
          SUBMIT
        </Button>
        <Button
          disableElevation
          variant="outlined"
          color="info"
          className="button button__outlined--passive"
          onClick={onClose}
        >
          CLOSE
        </Button>
      </div>
    </div>
  )
}

export default ProductCourseForm
