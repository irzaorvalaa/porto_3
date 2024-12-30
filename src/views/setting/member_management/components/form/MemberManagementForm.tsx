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
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import {
  initialMemberManagementFormdata,
  MemberManagementSchema,
} from './constants'
import {
  IMemberManagementFormData,
  IMemberManagementFormProps,
} from './interfaces'
import './MemberManagementForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { bool } from 'yup'
import { IFetchCampusStatus } from '../../interfaces'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'

const MemberManagementForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  academicProgramOptions = [],
  academicOrganizationOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IMemberManagementFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [campus, setCampus] = React.useState<IGeneralFetch | null>(null)
  const [academicProgram, setAcademicProgram] = React.useState<IGeneralFetch | null>(null)
  const [academicOrganization, setAcademicOrganization] = React.useState<IGeneralFetch | null>(null)
  const [date, setDate] = React.useState<null | Date>(null)

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<IMemberManagementFormData>({
    defaultValues: initialMemberManagementFormdata,
    resolver: yupResolver(MemberManagementSchema),
  })

  const onEnter = () => {
    setValue('action', 'Edit')

    const selectedCampus = campusOptions.find((item) => item.id === defaultValue?.campusID)
    setCampus(selectedCampus || null)

    const selectedAcademicProgram = academicProgramOptions.find((item) => item.id === defaultValue?.academicProgram)
    setAcademicProgram(selectedAcademicProgram || null)

    const selectedAcademicOrganization = academicOrganizationOptions.find((item) => item.id === defaultValue?.academicOrganization)
    setAcademicOrganization(selectedAcademicOrganization || null)

    setValue('id', defaultValue?.id)
    setValue('binusianID', defaultValue?.binusianID)
    setValue('memberCode', defaultValue?.memberCode)
    setValue('name', defaultValue?.name)
    setValue('email', defaultValue?.email)

    setValue('phoneNumber', defaultValue?.phoneNumber)
    setValue('address', defaultValue?.address)
    if (defaultValue?.expiredDate != "0001-01-01T00:00:00") {
      const expDate = moment(defaultValue?.expiredDate)
      if (expDate.isValid()) {
        setDate(moment(defaultValue?.expiredDate).toDate())
        setValueDate(defaultValue?.expiredDate ? defaultValue?.expiredDate : '')
      }
    } else {
      setDate(null)
      setValueDate('')
    }
    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setCampus(null)
    setAcademicProgram(null)
    setAcademicOrganization(null)
    setDate(null)
    reset(initialMemberManagementFormdata)
  }

  const onSubmit = (values: IMemberManagementFormData) => {
    const postData: IMemberManagementFormData = {
      ...values,
      campusID: campus?.id,
      campusName: campus?.label,
      academicProgram: academicProgram?.id,
      academicProgramDesc: academicProgram?.label,
      academicOrganization: academicOrganization?.id,
      academicOrganizationDesc: academicOrganization?.label
    }
    onConfirm?.(postData)
  }

  const onChangeDate = (value: Date | null) => {
    const date = moment(value)
    if (date.isValid()) {
      setDate(value)
      setValueDate(value ? value : '')
    } else {
      setValueDate('')
    } 
  }

  const setValueDate = async (value: Date | string) => {
    if (value != '') {
      const newValue = moment(value).format(FORMAT_DATE_POST)

      setValue('expiredDate', newValue)
    } else {
      setValue('expiredDate', '')
    }
  }


  const getTitle = () => {
    const title = 'Member'

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
            <FormLabel className="complex-form__formlabel">Binusian ID</FormLabel>
            <TextField
              size="small"
              placeholder=""
              disabled
              error={isFieldError(errors, 'binusianID')}
              helperText={errors.binusianID?.message}
              {...register('binusianID')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Member Code</FormLabel>
            <TextField
              size="small"
              placeholder=""
              disabled
              error={isFieldError(errors, 'memberCode')}
              helperText={errors.memberCode?.message}
              {...register('memberCode')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Name</FormLabel>
            <TextField
              size="small"
              placeholder="Loading"
              disabled
              error={isFieldError(errors, 'name')}
              helperText={errors.name?.message}
              {...register('name')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Email</FormLabel>
            <TextField
              size="small"
              placeholder="Type here"
              disabled
              error={isFieldError(errors, 'email')}
              helperText={errors.email?.message}
              {...register('email')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Campus *</FormLabel>
            <Controller
              control={control}
              name="campusID"
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
                      error={isFieldError(errors, 'campusID')}
                      helperText={errors.campusID?.message}
                      {...register('campusID')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Academic Program</FormLabel>
            <Controller
              control={control}
              name="academicProgram"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={academicProgram}
                  options={academicProgramOptions}
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
                      error={isFieldError(errors, 'academicProgram')}
                      helperText={errors.academicProgram?.message}
                      {...register('academicProgram')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Academic Organization</FormLabel>
            <Controller
              control={control}
              name="academicOrganization"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={academicOrganization}
                  options={academicOrganizationOptions}
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
                      error={isFieldError(errors, 'academicOrganization')}
                      helperText={errors.academicOrganization?.message}
                      {...register('academicOrganization')}
                    />
                  )}
                />
              )}
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
            <FormLabel className="complex-form__formlabel">Expired Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                showDaysOutsideCurrentMonth
                className="hidden sm:block"
                mask="__/__/____"
                minDate={new Date()}
                inputFormat={FORMAT_DATE_INPUT}
                value={date}
                onChange={onChangeDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={isFieldError(errors, 'expiredDate')}
                    helperText={errors.expiredDate?.message}
                  />
                )}
              />
              <MobileDatePicker
                showDaysOutsideCurrentMonth
                className="block sm:hidden"
                mask="__/__/____"
                minDate={new Date()}
                inputFormat={FORMAT_DATE_INPUT}
                value={date}
                onChange={onChangeDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={isFieldError(errors, 'expiredDate')}
                    helperText={errors.expiredDate?.message}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </div>
        
      </form>
    </DialogForm>
  )
}

export default MemberManagementForm
