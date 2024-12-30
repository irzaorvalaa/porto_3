import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  InputAdornment,
  TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { IProductDetailFormData, IProductDetailFormProps } from './interfaces'
import { masterCollectionDetailSchema, initialProductDetailFormdata } from './constants'
import isFieldError from '../../../../../utilities/isFieldError'
import { IProductFormDetailData } from '../product_form/interfaces'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import './ProductDetailForm.scss'

const ProductDetailForm = ({
  defaultValue = null,
  campusOptions = [],
  bookTypeOptions = [],
  loading = false,
  onSubmit,
  onClose,
}: IProductDetailFormProps) => {
  // State
  const [selectedCampus, setSelectedCampus] = React.useState<IGeneralFetch | null>(null)
  const [selectedBookType, setSelectedBookType] = React.useState<IGeneralFetch | null>(null)
  const [date, setDate] = React.useState<Date | null>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IProductDetailFormData>({
    defaultValues: initialProductDetailFormdata,
    resolver: yupResolver(masterCollectionDetailSchema),
  })

  const onSave = (values: IProductDetailFormData) => {
    const formData: IProductFormDetailData = {
      id: defaultValue ? defaultValue.id : new Date().getTime().toString(),
      nib: values.nib ?? '',
      campus: selectedCampus as IGeneralFetch,
      bookPhysic: values.bookPhysic ?? '',
      collectionBookType: selectedBookType as IGeneralFetch,
      collectionAquisitionType: values.collectionAquisitionType ?? '',
      mediaType: values.mediaType ?? '',
      condition: values.condition ?? '',
      dateIn: values.dateIn ?? '',
    }

    if (onSubmit) onSubmit(defaultValue ? 'Edit' : 'Add', formData)

    reset(initialProductDetailFormdata)
    setSelectedCampus(null)
    setSelectedBookType(null)
  }

  const onChangeDate = (value: Date | null) => {
    setDate(value)
    setValueDate(value ? value : '')
  }

  const setValueDate = (value: Date | string) => {
    const newValue = moment(value).format(FORMAT_DATE_POST)
    setValue('dateIn', newValue)
  }

  React.useEffect(() => {
    setValue('nib', defaultValue ? defaultValue.nib : '')
    setValue('campus', defaultValue ? defaultValue.campus.id : '')
    setValue('bookPhysic', defaultValue ? defaultValue.bookPhysic : '')
    setValue('collectionBookType', defaultValue ? defaultValue.collectionBookType.label : '')
    setValue('collectionAquisitionType', defaultValue ? defaultValue.collectionAquisitionType : '')
    setValue('mediaType', defaultValue ? defaultValue.mediaType : '')
    setValue('condition', defaultValue ? defaultValue.condition : '')
    setValue('dateIn', defaultValue ? defaultValue.dateIn : '')

    setSelectedCampus(defaultValue ? defaultValue.campus : null)
    setSelectedBookType(defaultValue ? defaultValue.collectionBookType : null)

    const newDate =
      defaultValue && defaultValue.dateIn ? moment(defaultValue.dateIn).toDate() : date
    setDate(newDate)
  }, [defaultValue])

  return (
    <div className="collection-management-detail-form__form">
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">NIB *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'nib')}
            helperText={errors.nib?.message}
            {...register('nib')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Campus Location *</FormLabel>
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
                getOptionLabel={(option) => option.label ?? ''}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Please select"
                    error={isFieldError(errors, 'campus')}
                    helperText={errors.campus?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {loading && <CircularProgress size={24} />}
                          {params.InputProps.endAdornment}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Date In *</FormLabel>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              disableMaskedInput
              showDaysOutsideCurrentMonth
              className="hidden sm:block"
              mask="__/__/____"
              inputFormat={FORMAT_DATE_INPUT}
              value={date}
              onChange={onChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  error={isFieldError(errors, 'dateIn')}
                  helperText={errors.dateIn?.message}
                />
              )}
            />
            <MobileDatePicker
              disableMaskedInput
              showDaysOutsideCurrentMonth
              className="block sm:hidden"
              mask="__/__/____"
              inputFormat={FORMAT_DATE_INPUT}
              value={date}
              onChange={onChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  error={isFieldError(errors, 'dateIn')}
                  helperText={errors.dateIn?.message}
                />
              )}
            />
          </LocalizationProvider>
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Book Physic *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'bookPhysic')}
            helperText={errors.bookPhysic?.message}
            {...register('bookPhysic')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Book Type *</FormLabel>
          <Controller
            control={control}
            name="collectionBookType"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedBookType}
                options={bookTypeOptions}
                onChange={(_, newValue) => {
                  onChange(newValue?.label)
                  setSelectedBookType(newValue)
                }}
                getOptionLabel={(option) => option.label ?? ''}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Please select"
                    error={isFieldError(errors, 'collectionBookType')}
                    helperText={errors.collectionBookType?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {loading && <CircularProgress size={24} />}
                          {params.InputProps.endAdornment}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Acquisition Type *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'collectionAquisitionType')}
            helperText={errors.collectionAquisitionType?.message}
            {...register('collectionAquisitionType')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Media Type *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'mediaType')}
            helperText={errors.mediaType?.message}
            {...register('mediaType')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-form__formwrapper">
        <FormControl fullWidth margin="dense">
          <FormLabel className="collection-management__formlabel">Condition *</FormLabel>
          <TextField
            size="small"
            placeholder="Type here"
            error={isFieldError(errors, 'condition')}
            helperText={errors.condition?.message}
            {...register('condition')}
          />
        </FormControl>
        <div />
      </div>
      <div className="collection-management-detail-form__button">
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

export default ProductDetailForm
