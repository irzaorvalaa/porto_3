import * as React from 'react'
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataActionType, IFormDataOption } from '../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import isFieldError from '../../../../../utilities/isFieldError'
import { initialUserManagementFormdata, UserManagementSchema } from './constants'
import { IUserManagementFormData, IUserManagementFormProps } from './interfaces'
import './UserManagementForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { IUserManagementLookup } from '../../interfaces'

const UserManagementForm = ({
  open = false,
  type = 'add',
  campusOptions = [],
  academicProgramOptions = [],
  roleOptions = [],
  defaultValue = null,
  onConfirm,
  onClose,
  onLookupBinusian,
  ...other
}: IUserManagementFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [userType, setUserType] = React.useState<IFormDataOption | null>(null)
  const [campus, setCampus] = React.useState<IGeneralFetch[]>([])
  const [academicProgram, setAcademicProgram] = React.useState<IGeneralFetch[]>([])
  const [role, setRole] = React.useState<IGeneralFetch[]>([])
  const [isLookUp, setIsLookUp] = React.useState<boolean>(false)
  const [lookupData, setLookupData] = React.useState<IUserManagementLookup | null>(null)
  const [isBinusianForm, setIsBinusianForm] = React.useState<string>()

  // Form Hook
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IUserManagementFormData>({
    defaultValues: initialUserManagementFormdata,
    resolver: yupResolver(UserManagementSchema),
  })

  const arrFormUserType: IFormDataOption[] = [
    {
      value: 'T',
      label: 'Binusian',
    },
    {
      value: 'F',
      label: 'External',
    },
  ]

  const onEnter = () => {
    setValue('action', defaultValue?.id != undefined ? 'Edit' : 'Add')
    setValue('selAllCampus', 'F')
    if (defaultValue?.id) {
      const selectedUserType = arrFormUserType.find(
        (item) => item.value === defaultValue?.isBinusian,
      )
      setUserType(selectedUserType || null)

      const selectedRole = defaultValue.roleAssignation
        ? defaultValue.roleAssignation.map((x) => ({ id: x.roleId, label: x.roleName }))
        : []
      setRole(selectedRole)
      setValue(
        'roleID',
        defaultValue?.roleAssignation.map((x) => x.roleId),
      )

      let selectedCampus = defaultValue.campusAssignation
        ? defaultValue.campusAssignation.map((x) => ({ id: x.campusId, label: x.campusName }))
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

      const selectedAcademicProgram = defaultValue.academicProgramAssignation
        ? defaultValue.academicProgramAssignation.map((x) => ({
            id: x.academicProgram,
            label: x.academicProgramDesc,
          }))
        : []
      setAcademicProgram(selectedAcademicProgram)
      setValue(
        'academicProgram',
        defaultValue?.academicProgramAssignation.map((x) => x.academicProgram),
      )
    }

    setValue('id', defaultValue?.id)
    setValue('isBinusian', defaultValue?.isBinusian)
    setValue('binusianID', defaultValue?.binusianID)
    setValue('name', defaultValue?.name)
    setValue('email', defaultValue?.email)
    setValue('phoneNumber', defaultValue?.phoneNumber)
    setValue('institutionName', defaultValue?.institutionName)
    setValue('institutionAddress', defaultValue?.institutionAddress)

    setIsBinusianForm(defaultValue?.isBinusian)

    autoFocusRef.current?.focus()
  }

  const onExit = () => {
    setUserType(null)
    setCampus([])
    setAcademicProgram([])
    setRole([])
    setIsBinusianForm('')
    reset(initialUserManagementFormdata)
  }

  const handleSetAllCampus = () => {
    setValue('selAllCampus', watch('selAllCampus') == 'T' ? 'F' : 'T')
  }

  const watchBinusianID = watch('binusianID')
  const handleLookupBinusian = () => {
    if (onLookupBinusian && watchBinusianID) {
      setIsLookUp(true)
      clearErrors('binusianID')

      onLookupBinusian(watchBinusianID, (data, error) => {
        if (data) {
          setLookupData(data)

          setValue('binusianID', data.binusianID ?? '')
          setValue('name', data.name ?? '')
          setValue('email', data.email ?? '')

          setIsLookUp(false)
        }

        if (error) {
          setLookupData(null)
        }

        setIsLookUp(false)
      })
    }
  }

  const onSubmit = (values: IUserManagementFormData) => {
    const postData: IUserManagementFormData = {
      ...values,
      isBinusian: isBinusianForm,
      campusID: campus.map((x) => x.id),
      campusName: campus.map((x) => x.label),
      academicProgram: academicProgram.map((x) => x.id),
      academicProgramDesc: academicProgram.map((x) => x.label),
      roleID: role.map((x) => x.id),
      roleName: role.map((x) => x.label),
    }
    onConfirm?.(postData)
  }

  const getTitle = () => {
    const title = 'User'

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
            <FormLabel className="complex-form__formlabel">User Type *</FormLabel>
            <Controller
              control={control}
              name="isBinusian"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={userType}
                  options={arrFormUserType}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setUserType(newValue)
                    setIsBinusianForm(newValue?.value)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select"
                      size="small"
                      error={isFieldError(errors, 'isBinusian')}
                      helperText={errors.isBinusian?.message}
                      {...register('isBinusian')}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        {isBinusianForm == 'T' && (
          <div className="complex-form__formwrapper">
            <FormControl fullWidth margin="dense">
              <FormLabel className="complex-form__formlabel">Binusian ID *</FormLabel>
              <TextField
                size="small"
                placeholder={isLookUp ? 'Loading...' : 'Type here'}
                error={isFieldError(errors, 'binusianID')}
                helperText={errors.binusianID?.message}
                inputProps={{
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      handleLookupBinusian()
                    }
                  },
                  onBlur: (e) => {
                    if (!watchBinusianID || e.target.value !== lookupData?.binusianID) {
                      handleLookupBinusian()
                    }
                  },
                }}
                {...register('binusianID')}
              />
            </FormControl>
          </div>
        )}
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Name *</FormLabel>
            <TextField
              size="small"
              placeholder={isLookUp ? 'Loading...' : 'Type here'}
              error={isFieldError(errors, 'name')}
              helperText={errors.name?.message}
              {...register('name')}
            />
          </FormControl>
        </div>
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Email *</FormLabel>
            <TextField
              size="small"
              placeholder={isLookUp ? 'Loading...' : 'Type here'}
              error={isFieldError(errors, 'email')}
              helperText={errors.email?.message}
              {...register('email')}
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
        {isBinusianForm == 'F' && (
          <div>
            <div className="complex-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="complex-form__formlabel">Password *</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  type="password"
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  error={isFieldError(errors, 'password')}
                  helperText={errors.password?.message}
                  {...register('password')}
                />
              </FormControl>
            </div>
            <div className="complex-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="complex-form__formlabel">Institution Name</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'institutionName')}
                  helperText={errors.institutionName?.message}
                  {...register('institutionName')}
                />
              </FormControl>
            </div>
            <div className="complex-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="complex-form__formlabel">Institution Address</FormLabel>
                <TextField
                  size="small"
                  placeholder="Type here"
                  error={isFieldError(errors, 'institutionAddress')}
                  helperText={errors.institutionAddress?.message}
                  {...register('institutionAddress')}
                />
              </FormControl>
            </div>
          </div>
        )}

        {isBinusianForm == 'T' && (
          <div>
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
            <div className="complex-form__formwrapper">
              <FormControl fullWidth margin="dense">
                <FormLabel className="complex-form__formlabel">Academic Program</FormLabel>
                <Controller
                  control={control}
                  name="academicProgram"
                  render={({ field: { onChange } }) => (
                    <Autocomplete
                      multiple
                      value={academicProgram}
                      options={academicProgramOptions}
                      onChange={(_, newValue) => {
                        onChange(newValue ? newValue.map((v) => v.id) : [])
                        setAcademicProgram(newValue)
                      }}
                      getOptionLabel={(option) => (option.label ? option.label : '')}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Please Select"
                          size="small"
                          error={isFieldError(errors, 'academicProgram')}
                          helperText={errors.academicProgram?.message}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
            </div>
          </div>
        )}
        <div className="complex-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Role *</FormLabel>
            <Controller
              control={control}
              name="roleID"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  multiple
                  value={role}
                  options={roleOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue ? newValue.map((v) => v.id) : [])
                    setRole(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Please Select"
                      size="small"
                      error={isFieldError(errors, 'roleID')}
                      helperText={errors.roleID?.message}
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

export default UserManagementForm
