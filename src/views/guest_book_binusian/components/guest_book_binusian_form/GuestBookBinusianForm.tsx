import * as React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isFieldError from '../../../../utilities/isFieldError'
import { IGuestBookMember } from '../../interfaces'
import { IGuestBookBinusianFormData, IGuestBookBinusianFormProps } from './interfaces'
import { guestBookBinusianSchema, initialGuestBookBinusianFormdata } from './constants'
import './GuestBookBinusianForm.scss'

import { ReactComponent as PitaBiru } from '../../../../assets/svg/pita-biru.svg'
import { ReactComponent as LogoBinus } from '../../../../assets/svg/logo-binus-university.svg'
import { ReactComponent as LocationIcon } from '../../../../assets/svg/icons/location.svg'
import { ReactComponent as SettingIcon } from '../../../../assets/svg/icons/setting.svg'

const GuestBookBinusianForm = ({
  campus,
  loading = false,
  lockerBorrowing = false,
  onConfirm,
  onSetting,
  onLookupMember,
}: IGuestBookBinusianFormProps) => {
  // State
  const [memberData, setMemberData] = React.useState<IGuestBookMember | null>(null)
  const [isValidMember, setIsValidMember] = React.useState<boolean>(true)
  const [looking, setLooking] = React.useState<boolean>(false)
  const [showAcadProg, setShowAcadProg] = React.useState<boolean>(true)
  const [showAcadOrg, setShowAcadOrg] = React.useState<boolean>(false)

  // Form Hook
  const {
    control,
    handleSubmit,
    watch,
    register,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IGuestBookBinusianFormData>({
    defaultValues: initialGuestBookBinusianFormdata,
    resolver: yupResolver(guestBookBinusianSchema),
  })
  const watchBorrowLocker = watch('isBorrowLocker')
  const watchMemberCode = watch('memberCode')
  const watchBinusianID = watch('binusianId')

  const handleLookupMemberCode = () => {
    if (onLookupMember && watchMemberCode) {
      setLooking(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { memberCode, ...resetForm } = initialGuestBookBinusianFormdata
      reset(resetForm)
      clearErrors('memberCode')

      onLookupMember(watchMemberCode, (member, error) => {
        if (member) {
          setMemberData(member)
          setIsValidMember(true)

          setValue('campusId', campus?.id ?? '')
          setValue('campusName', campus?.name ?? '')
          setValue('binusianId', member.binusianID ?? '')
          setValue('memberCode', member.memberCode ?? '')
          setValue('isLecturer', member.isLecturer ?? '')
          setValue('sourceCampusId', member.campus ?? '')
          setValue('sourceCampusName', member.campusDesc ?? '')
          setValue('name', member.name ?? '')
          setValue('email', member.email ?? '')
          setValue('academicGroup', member.academicGroup ?? '')
          setValue('academicGroupDesc', member.academicGroupDesc ?? '')
          setValue('academicOrganization', member.academicOrganization ?? '')
          setValue('academicOrganizationDesc', member.academicOrganizationDesc ?? '')
          setValue('academicProgram', member.academicProgram ?? '')
          setValue('academicProgramDesc', member.academicProgramDesc ?? '')
          if (member.isLecturer == 'T')
          {
            setShowAcadProg(false)
            setShowAcadOrg(true)
          }
          else
          {
            setShowAcadProg(true)
            setShowAcadOrg(false)
          }
        }

        if (error) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { memberCode, ...resetForm } = initialGuestBookBinusianFormdata
          reset(resetForm)
          setMemberData(null)
          setIsValidMember(false)
          setError('memberCode', { message: error })
        }

        setLooking(false)
      })
    }
  }

  const onSubmit = (values: IGuestBookBinusianFormData) => {
    if (!isValidMember) {
      setError('memberCode', { message: 'Member not found' })
    }

    if (isValidMember && onConfirm) {
      onConfirm({
        ...values,
        campusId: campus?.id ?? '',
        campusName: campus?.name ?? '',
        sourceCampusId: campus?.id ?? '',
        sourceCampusName: campus?.name ?? '',
      })

      reset(initialGuestBookBinusianFormdata)
    }
  }

  return (
    <div className="guestbook-binusian-form">
      <div className="guestbook-binusian-form__container">
        <div className="guestbook-binusian-form__header">
          <div className="guestbook-binusian-form__logowrapper">
            <PitaBiru />
            <LogoBinus className="guestbook-binusian-form__logo" />
          </div>
          <div className="guestbook-binusian-form__settingcampus">
            <LocationIcon className="guestbook-binusian-form__settingcampus--locationicon" />
            <span className="guestbook-binusian-form__settingcampus--name">
              {campus ? campus.name : '-'}
            </span>
            <IconButton onClick={onSetting}>
              <SettingIcon className="guestbook-binusian-form__settingcampus--settingicon" />
            </IconButton>
          </div>
        </div>
        <div className="guestbook-binusian-form__title">WELCOME TO BINUS LIBRARY</div>
        <form>
          <div className="guestbook-binusian-form__form">
            <div>
              <FormControl fullWidth margin="dense">
                <FormLabel className="guestbook-binusian__formlabel">Member Code *</FormLabel>
                <TextField
                  size="small"
                  error={isFieldError(errors, 'memberCode')}
                  placeholder="Type here your NIM / Lecturer Code"
                  helperText={errors.memberCode?.message}
                  inputProps={{
                    onKeyDown: (event) => {
                      if (event.key === 'Enter') {
                        handleLookupMemberCode()
                      }
                    },
                    onBlur: (e) => {
                      if (!watchBinusianID || e.target.value !== memberData?.memberCode) {
                        handleLookupMemberCode()
                      }
                    },
                  }}
                  {...register('memberCode')}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth margin="dense">
                <FormLabel className="guestbook-binusian__formlabel">Name</FormLabel>
                <TextField
                  disabled
                  size="small"
                  error={isFieldError(errors, 'name')}
                  helperText={errors.name?.message}
                  placeholder="Generated Content"
                  InputProps={{
                    startAdornment: looking ? (
                      <InputAdornment position="start">
                        <Skeleton width={100} />
                      </InputAdornment>
                    ) : null,
                  }}
                  {...register('name')}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel className="guestbook-binusian__formlabel">Campus</FormLabel>
                <TextField
                  disabled
                  size="small"
                  placeholder="Generated Content"
                  error={isFieldError(errors, 'sourceCampusName')}
                  helperText={errors.sourceCampusName?.message}
                  InputProps={{
                    startAdornment: looking ? (
                      <InputAdornment position="start">
                        <Skeleton width={100} />
                      </InputAdornment>
                    ) : null,
                  }}
                  {...register('sourceCampusName')}
                />
              </FormControl>
              { showAcadProg && (
                <div>
                  <FormControl fullWidth margin="dense">
                    <FormLabel className="guestbook-binusian__formlabel">Academic Program</FormLabel>
                    <TextField
                      disabled
                      size="small"
                      placeholder="Generated Content"
                      error={isFieldError(errors, 'academicProgramDesc')}
                      helperText={errors.academicProgramDesc?.message}
                      InputProps={{
                        startAdornment: looking ? (
                          <InputAdornment position="start">
                            <Skeleton width={100} />
                          </InputAdornment>
                        ) : null,
                      }}
                      {...register('academicProgramDesc')}
                    />
                  </FormControl>
                </div>
              )}
              { showAcadOrg && (
                <FormControl fullWidth margin="dense">
                  <FormLabel className="guestbook-binusian__formlabel">Academic Organization</FormLabel>
                  <TextField
                    disabled
                    size="small"
                    placeholder="Generated Content"
                    error={isFieldError(errors, 'academicOrganizationDesc')}
                    helperText={errors.academicOrganizationDesc?.message}
                    InputProps={{
                      startAdornment: looking ? (
                        <InputAdornment position="start">
                          <Skeleton width={100} />
                        </InputAdornment>
                      ) : null,
                    }}
                    {...register('academicOrganizationDesc')}
                  />
                </FormControl>
              )}
              {lockerBorrowing && (
                <div>
                  <Controller
                    control={control}
                    name="isBorrowLocker"
                    render={({ field: { onChange, value } }) => (
                      <FormControl margin="dense">
                        <FormLabel className="guestbook-binusian__formlabel">
                          Do you wish to borrow Locker?
                        </FormLabel>
                        <RadioGroup row name="isBorrowLocker">
                          <FormControlLabel
                            value="T"
                            control={
                              <Radio
                                checked={value === 'T' || watchBorrowLocker === 'T'}
                                onChange={onChange}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            value="F"
                            control={
                              <Radio
                                checked={value === 'F' || watchBorrowLocker === 'F'}
                                onChange={onChange}
                              />
                            }
                            label="No"
                          />
                        </RadioGroup>
                        {isFieldError(errors, 'isBorrowLocker') && (
                          <FormHelperText error={isFieldError(errors, 'isBorrowLocker')}>
                            {errors?.isBorrowLocker?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                  { watchBorrowLocker === 'T' && (
                    <FormControl fullWidth margin="dense">
                      <FormLabel className="guestbook-binusian__formlabel">Locker Number *</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Type here"
                        error={isFieldError(errors, 'lockerNumber')}
                        helperText={errors.lockerNumber?.message}
                        {...register('lockerNumber')}
                      />
                    </FormControl>
                  )}
                </div>
              )}
              
            </div>
          </div>
          <LoadingButton
            fullWidth
            disableElevation
            variant="contained"
            color="secondary"
            className="button button--secondary guestbook-binusian-form__button"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            SUBMIT
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}

export default GuestBookBinusianForm
