import * as React from 'react'
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { IFormDataOption } from '../../../../../interfaces/IFormData'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../../../../constants/Parameter'
import isFieldError from '../../../../../utilities/isFieldError'
import { IReferenceClinicDetail } from '../../interfaces'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'
import {
  appointmentStatusOptions,
  attendStatusOptions,
  initialReferenceClinicFormdata,
  referenceClinicSchema,
} from './constants'
import {
  IReferenceClinicFormData,
  IReferenceClinicFormParticipant,
  IReferenceClinicFormPIC,
  IReferenceClinicFormProps,
} from './interfaces'
import './ReferenceClinicForm.scss'

// Components
import DialogForm from '../../../../../components/dialog_form'
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'
import { IUserManagementLookup } from '../../../../setting/user_management/interfaces'
import { IMemberLookup } from '../../../../setting/member_management/interfaces'

const ReferenceClinicForm = ({
  open = false,
  type = 'add',
  defaultValue = null,
  timeSlotOptions = [],
  timeSlotLoading = false,
  onConfirm,
  onClose,
  onOpen,
  onLookupBinusian,
  onLookupMember,
  onChangeAppointmentDate,
  ...other
}: IReferenceClinicFormProps) => {
  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const [detail, setDetail] = React.useState<IReferenceClinicDetail | null>(null)
  const [referenceScheduleOptions, setReferenceScheduleOptions] =
    React.useState<IGeneralFetch[]>(timeSlotOptions)
  const [meetingLinkOptions, setMeetingLinkOptions] = React.useState<IGeneralFetch[]>([])
  const [date, setDate] = React.useState<Date | null>(null)
  const [selectedReferenceSchedule, setSelectedReferenceSchedule] =
    React.useState<IGeneralFetch | null>(null)
  const [selectedMeetingLink, setSelectedMeetingLink] = React.useState<IGeneralFetch | null>(null)
  const [selectedAttendStatus, setSelectedAttendStatus] = React.useState<IFormDataOption | null>(
    null,
  )
  const [selectedAppointmentStatus, setSelectedAppointmentStatus] =
    React.useState<IFormDataOption | null>(null)
  const [isFetching, setIsFetching] = React.useState<boolean>(false)
  const [isRequestorLecturer, setIsRequestorLecturer] = React.useState<boolean>(false)
  const [lookupDataBinusian, setLookupDataBinusian] = React.useState<IUserManagementLookup | null>(
    null,
  )
  const [lookupDataMember, setLookupDataMember] = React.useState<IMemberLookup | null>(null)
  const [timeSlotID, setTimeSlotID] = React.useState<string | null>('')

  // Form Hook
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IReferenceClinicFormData>({
    defaultValues: initialReferenceClinicFormdata,
    resolver: yupResolver(referenceClinicSchema),
  })

  const {
    fields: fieldsPIC,
    append: appendFieldPIC,
    remove: removeFieldPIC,
  } = useFieldArray({ control, name: 'picList' })

  const {
    fields: fieldsParticipant,
    append: appendFieldParticipant,
    remove: removeFieldParticipant,
  } = useFieldArray({ control, name: 'participantList' })

  const appendPIC = () => {
    appendFieldPIC({ userId: '', binusianId: '', name: '', email: '' })
  }

  const appendParticipant = () => {
    appendFieldParticipant({
      userId: '',
      memberCode: '',
      name: '',
      email: '',
      isLecturer: false,
      academicGroup: '',
      academicGroupDesc: '',
      academicProgram: '',
      academicProgramDesc: '',
      academicOrganization: '',
      academicOrganizationDesc: '',
    })
  }

  const onEnter = () => {
    setValue('action', defaultValue ? 'Edit' : 'Add')

    if (onOpen) {
      setIsFetching(true)

      onOpen(defaultValue, (referenceSchedule, meetingLink, referenceClinic) => {
        if (referenceSchedule) setReferenceScheduleOptions(referenceSchedule)

        if (meetingLink) setMeetingLinkOptions(meetingLink)

        if (referenceClinic && type === 'edit') {
          setDetail(referenceClinic)
          setTimeSlotID(referenceClinic.referenceSchedule ?? '')
          setValue('id', referenceClinic.id ?? '')
          setValue('appointmentDate', referenceClinic.appointmentDate ?? '')
          setValue('timeSlot', referenceClinic.timeSlot ?? '')
          setValue('attendStatus', referenceClinic.isAttended ?? '')
          setValue('appointmentStatus', referenceClinic.appointmentStatusID ?? '')
          setValue('requestorIsLecturer', referenceClinic.requestorIsLecturer ?? '')
          setIsRequestorLecturer(referenceClinic.requestorIsLecturer == 'T' ? true : false)
          setValue('zoomLink', referenceClinic.zoomLink ?? '')
          setValue(
            'picList',
            referenceClinic.picLibrarian
              ? referenceClinic.picLibrarian.map((item) => ({
                  userId: item.userId,
                  binusianId: item.binusianId,
                  name: item.name,
                  email: item.email,
                }))
              : initialReferenceClinicFormdata.picList,
          )

          setValue(
            'participantList',
            referenceClinic.participant
              ? referenceClinic.participant.map((item) => ({
                  userId: item.userId,
                  memberCode: item.memberCode,
                  name: item.name,
                  email: item.email,
                  isLecturer: item.isLecturer,
                  academicGroup: item.academicGroup ?? '',
                  academicGroupDesc: item.academicGroupDesc ?? '',
                  academicProgram: item.academicProgram ?? '',
                  academicProgramDesc: item.academicProgramDesc ?? '',
                  academicOrganization: item.academicOrganizaton ?? '',
                  academicOrganizationDesc: item.academicOrganizatonDesc ?? '',
                }))
              : initialReferenceClinicFormdata.participantList,
          )

          const findTimeSlot = referenceSchedule
            ? referenceSchedule.find((item) => item.id === referenceClinic.referenceSchedule)
            : null
          setSelectedReferenceSchedule(findTimeSlot ?? null)

          const newDate = moment(referenceClinic.appointmentDate).toDate()
          setDate(newDate)

          const findAttendStatus = attendStatusOptions.find(
            (item) => item.value === referenceClinic.isAttended,
          )
          setSelectedAttendStatus(findAttendStatus ?? null)

          const findAppointmentStatus = appointmentStatusOptions.find(
            (item) => item.value === referenceClinic.appointmentStatusID,
          )
          setSelectedAppointmentStatus(findAppointmentStatus ?? null)

          const findMeetingLink = meetingLink
            ? meetingLink.find((item) => item.id === referenceClinic.zoomLink)
            : null
          setSelectedMeetingLink(findMeetingLink ?? null)
        }

        setIsFetching(false)
      })
    }

    autoFocusRef.current?.focus()
  }

  const handleLookupBinusian = (index: number) => {
    const watchBinusianID = watch(`picList.${index}.binusianId`)
    if (onLookupBinusian && watchBinusianID) {
      clearErrors(`picList.${index}.binusianId`)
      onLookupBinusian(watchBinusianID, (data: any, error: any) => {
        if (data) {
          setLookupDataBinusian(data)
          setValue(`picList.${index}.userId`, data.id)
          setValue(`picList.${index}.binusianId`, data.binusianID)
          setValue(`picList.${index}.name`, data.name)
          setValue(`picList.${index}.email`, data.email)
        }
        if (error) {
          setError(`picList.${index}.binusianId`, { message: error })
        }
      })
    }
  }

  const handleLookupMember = (index: number) => {
    const watchMemberCode = watch(`participantList.${index}.memberCode`)
    if (onLookupMember && watchMemberCode) {
      clearErrors(`participantList.${index}.memberCode`)
      onLookupMember(watchMemberCode, (data, error) => {
        if (data) {
          setLookupDataMember(data)
          console.log(data, index)
          setValue(`participantList.${index}.isLecturer`, data.isLecturer == 'T' ? true : false)
          fieldsParticipant[index].isLecturer = data.isLecturer == 'T' ? true : false
          setValue(`participantList.${index}.userId`, data.id)
          setValue(`participantList.${index}.name`, data.name)
          setValue(`participantList.${index}.email`, data.email)
          setValue(`participantList.${index}.academicGroup`, data.academicGroup ?? '')
          setValue(`participantList.${index}.academicGroupDesc`, data.academicGroupDesc ?? '')
          setValue(`participantList.${index}.academicProgram`, data.academicProgram ?? '')
          setValue(`participantList.${index}.academicProgramDesc`, data.academicProgramDesc ?? '')
          setValue(`participantList.${index}.academicOrganization`, data.academicOrganization ?? '')
          setValue(
            `participantList.${index}.academicOrganizationDesc`,
            data.academicOrganizationDesc ?? '',
          )
        }
        if (error) {
          setError(`participantList.${index}.memberCode`, { message: error })
        }
      })
    }
  }

  const onExit = () => {
    setSelectedAppointmentStatus(null)
    setSelectedAttendStatus(null)
    setSelectedMeetingLink(null)
    setSelectedReferenceSchedule(null)

    reset(initialReferenceClinicFormdata)
  }

  const onSubmit = (values: IReferenceClinicFormData) => {
    const postData: IReferenceClinicFormData = {
      ...values,
      referenceScheduleID: timeSlotID ?? '',
      picUserID: values.picList ? values.picList.map((item) => item.userId) : [],
      picBinusianID: values.picList ? values.picList.map((item) => item.binusianId) : [],
      picName: values.picList ? values.picList.map((item) => item.name) : [],
      picEmail: values.picList ? values.picList.map((item) => item.email) : [],
      participantUserID: values.participantList
        ? values.participantList.map((item) => item.userId)
        : [],
      memberCode: values.participantList
        ? values.participantList.map((item) => item.memberCode)
        : [],
      participantName: values.participantList
        ? values.participantList.map((item) => item.name)
        : [],
      participantEmail: values.participantList
        ? values.participantList.map((item) => item.email)
        : [],
      participantIsLecturer: values.participantList
        ? values.participantList.map((item) => item.isLecturer)
        : [],
      participantAcademicGroup: values.participantList
        ? values.participantList.map((item) => item.academicGroup)
        : [],
      participantAcademicGroupDesc: values.participantList
        ? values.participantList.map((item) => item.academicGroupDesc)
        : [],
      participantAcademicProgram: values.participantList
        ? values.participantList.map((item) => item.academicProgram)
        : [],
      participantAcademicProgramDesc: values.participantList
        ? values.participantList.map((item) => item.academicProgramDesc)
        : [],
      participantAcademicOrganization: values.participantList
        ? values.participantList.map((item) => item.academicOrganization)
        : [],
      participantAcademicOrganizationDesc: values.participantList
        ? values.participantList.map((item) => item.academicOrganizationDesc)
        : [],
    }

    if (onConfirm && postData) {
      setDetail(null)
      onConfirm(postData)
    }
  }

  const getTitle = () => {
    const title = 'Reference Clinic'

    if (type === 'edit') {
      return 'Edit '.concat(title)
    }

    return 'Form '.concat(title)
  }

  const onChangeDate = (value: Date | null) => {
    setDate(value)
    setValueDate(value ? value : '')
    setSelectedReferenceSchedule(null)
  }

  const setValueDate = (value: Date | string) => {
    const newValue = moment(value).format(FORMAT_DATE_POST)
    setValue('appointmentDate', newValue)

    if (onChangeAppointmentDate) onChangeAppointmentDate(newValue)
  }

  const getFieldPICErrorMessage = (index: number, field: keyof IReferenceClinicFormPIC) => {
    if (errors.picList && errors.picList[index]) {
      const fieldError = errors.picList[index]
      switch (field) {
        case 'userId':
          return fieldError?.userId?.message
        case 'binusianId':
          return fieldError?.binusianId?.message
        case 'name':
          return fieldError?.name?.message
        case 'email':
          return fieldError?.email?.message
        default:
          return null
      }
    }

    return null
  }

  const getFieldParticipantErrorMessage = (
    index: number,
    field: keyof IReferenceClinicFormParticipant,
  ) => {
    if (errors.participantList && errors.participantList[index]) {
      const fieldError = errors.participantList[index]
      switch (field) {
        case 'userId':
          return fieldError?.userId?.message
        case 'memberCode':
          return fieldError?.memberCode?.message
        case 'name':
          return fieldError?.name?.message
        case 'email':
          return fieldError?.email?.message
        case 'academicGroup':
          return fieldError?.academicGroup?.message
        case 'academicGroupDesc':
          return fieldError?.academicGroupDesc?.message
        case 'academicProgram':
          return fieldError?.academicProgram?.message
        case 'academicProgramDesc':
          return fieldError?.academicProgramDesc?.message
        case 'academicOrganization':
          return fieldError?.academicOrganization?.message
        case 'academicOrganizationDesc':
          return fieldError?.academicOrganizationDesc?.message
        default:
          return null
      }
    }

    return null
  }

  React.useEffect(() => {
    setReferenceScheduleOptions(timeSlotOptions)
  }, [timeSlotOptions])

  return (
    <DialogForm
      open={open}
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
        <div className="reference-clinic-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Appointment Date *</FormLabel>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                showDaysOutsideCurrentMonth
                disableMaskedInput
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
                    error={isFieldError(errors, 'appointmentDate')}
                    helperText={errors.appointmentDate?.message}
                  />
                )}
              />
              <MobileDatePicker
                showDaysOutsideCurrentMonth
                disableMaskedInput
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
                    error={isFieldError(errors, 'appointmentDate')}
                    helperText={errors.appointmentDate?.message}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Time Slot *</FormLabel>
            <Controller
              control={control}
              name="timeSlot"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={selectedReferenceSchedule}
                  options={referenceScheduleOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.label)
                    setSelectedReferenceSchedule(newValue)
                    setTimeSlotID(newValue?.id ?? '')
                  }}
                  getOptionLabel={(option) => option.label ?? ''}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  loading={isFetching || timeSlotLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Please select"
                      error={isFieldError(errors, 'timeSlot')}
                      helperText={errors.timeSlot?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            {(isFetching || timeSlotLoading) && <CircularProgress size={24} />}
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
        </div>
        <div className="reference-clinic-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Campus</FormLabel>
            <TextField size="small" value={detail?.campus ?? ''} disabled />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Requestor Binusian ID</FormLabel>
            <TextField size="small" value={detail?.requestorBinusianID ?? ''} disabled />
          </FormControl>
        </div>
        <div className="reference-clinic-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Requestor Name</FormLabel>
            <TextField size="small" value={detail?.requestorName ?? ''} disabled />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Requestor Email</FormLabel>
            <TextField size="small" value={detail?.requestorEmail ?? ''} disabled />
          </FormControl>
        </div>
        <div className="reference-clinic-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Requestor Academic Group</FormLabel>
            <TextField
              size="small"
              value={detail?.requestorAcademicGroupDesc ?? ''}
              disabled
              placeholder="-"
            />
          </FormControl>
          {isRequestorLecturer && (
            <FormControl fullWidth margin="dense">
              <FormLabel className="reference-clinic__formlabel">
                Requestor Academic Organization
              </FormLabel>
              <TextField
                size="small"
                value={detail?.requestorAcademicOrganizationDesc ?? ''}
                disabled
                placeholder="-"
              />
            </FormControl>
          )}
          {!isRequestorLecturer && (
            <FormControl fullWidth margin="dense">
              <FormLabel className="reference-clinic__formlabel">
                Requestor Academic Program
              </FormLabel>
              <TextField
                size="small"
                value={detail?.requestorAcademicProgramDesc ?? ''}
                disabled
                placeholder="-"
              />
            </FormControl>
          )}
        </div>
        <div className="reference-clinic-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Requestor No. Whatsapp</FormLabel>
            <TextField size="small" value={detail?.requestorWANumber ?? ''} disabled />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Topic</FormLabel>
            <TextField size="small" value={detail?.referenceTopicName ?? ''} disabled />
          </FormControl>
        </div>
        <div className="reference-clinic-form__formwrapper">
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Appointment Status *</FormLabel>
            <Controller
              control={control}
              name="appointmentStatus"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={selectedAppointmentStatus}
                  options={appointmentStatusOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setSelectedAppointmentStatus(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Please select"
                      error={isFieldError(errors, 'appointmentStatus')}
                      helperText={errors.appointmentStatus?.message}
                    />
                  )}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel className="reference-clinic__formlabel">Attend Status *</FormLabel>
            <Controller
              control={control}
              name="attendStatus"
              render={({ field: { onChange } }) => (
                <Autocomplete
                  value={selectedAttendStatus}
                  options={attendStatusOptions}
                  onChange={(_, newValue) => {
                    onChange(newValue?.value)
                    setSelectedAttendStatus(newValue)
                  }}
                  getOptionLabel={(option) => (option.label ? option.label : '')}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Please select"
                      error={isFieldError(errors, 'attendStatus')}
                      helperText={errors.attendStatus?.message}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        </div>
        <FormControl fullWidth margin="dense">
          <FormLabel className="reference-clinic__formlabel">Zoom Link</FormLabel>
          <Controller
            control={control}
            name="zoomLink"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedMeetingLink}
                options={meetingLinkOptions}
                onChange={(_, newValue) => {
                  onChange(newValue?.id)
                  setSelectedMeetingLink(newValue)
                }}
                getOptionLabel={(option) => option.label ?? ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                loading={isFetching}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Please select"
                    error={isFieldError(errors, 'zoomLink')}
                    helperText={errors.zoomLink?.message}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <FormLabel className="reference-clinic__formlabel">PIC Librarian *</FormLabel>
          <div>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              className="button button--secondary reference-clinic-form__buttonadd"
              onClick={appendPIC}
            >
              ADD PIC
            </Button>
          </div>
          {fieldsPIC.map((field, index) => (
            <div
              key={field.id}
              className={`reference-clinic-form__formpic ${index > 0 ? 'mt-4' : ''}`}
            >
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">PIC Binusian ID *</FormLabel>
                  <TextField
                    size="small"
                    placeholder="Type here"
                    error={isFieldError(errors.picList, 'binusianId', index)}
                    helperText={getFieldPICErrorMessage(index, 'binusianId')}
                    InputProps={{
                      onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                          handleLookupBinusian(index)
                        }
                      },
                      onBlur: (e) => {
                        if (e.target.value !== lookupDataBinusian?.binusianID) {
                          handleLookupBinusian(index)
                        }
                      },
                    }}
                    {...register(`picList.${index}.binusianId`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">PIC Name</FormLabel>
                  <TextField
                    size="small"
                    disabled
                    placeholder="Generated"
                    error={isFieldError(errors.picList, 'name', index)}
                    helperText={getFieldPICErrorMessage(index, 'name')}
                    {...register(`picList.${index}.name`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">PIC Email</FormLabel>
                  <TextField
                    size="small"
                    disabled
                    placeholder="Generated"
                    error={isFieldError(errors.picList, 'email', index)}
                    helperText={getFieldPICErrorMessage(index, 'email')}
                    {...register(`picList.${index}.email`)}
                  />
                </FormControl>
                <div />
              </div>
              {index > 0 && (
                <div className="reference-clinic-form__buttondelete">
                  <IconButton color="error" size="medium" onClick={() => removeFieldPIC(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          ))}
        </FormControl>

        <FormControl fullWidth margin="dense">
          <FormLabel className="reference-clinic__formlabel">Participant/Attendees *</FormLabel>
          <div>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              className="button button--secondary reference-clinic-form__buttonadd"
              onClick={appendParticipant}
            >
              ADD PARTICIPANT
            </Button>
          </div>
          {fieldsParticipant.map((field, index) => (
            <div
              key={field.id}
              className={`reference-clinic-form__formpic ${index > 0 ? 'mt-4' : ''}`}
            >
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">
                    Member Code {index == 0 ? '' : '*'}
                  </FormLabel>
                  <TextField
                    size="small"
                    disabled={index == 0 ? true : false}
                    placeholder={index == 0 ? '-' : 'Type here'}
                    error={isFieldError(errors.participantList, 'memberCode', index)}
                    helperText={getFieldParticipantErrorMessage(index, 'memberCode')}
                    InputProps={{
                      onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                          handleLookupMember(index)
                        }
                      },
                      onBlur: (e) => {
                        if (e.target.value !== lookupDataMember?.memberCode) {
                          handleLookupMember(index)
                        }
                      },
                    }}
                    {...register(`participantList.${index}.memberCode`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">Name</FormLabel>
                  <TextField
                    size="small"
                    disabled
                    placeholder={index == 0 ? '-' : 'Generated'}
                    error={isFieldError(errors.participantList, 'name', index)}
                    helperText={getFieldParticipantErrorMessage(index, 'name')}
                    {...register(`participantList.${index}.name`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">Email</FormLabel>
                  <TextField
                    size="small"
                    disabled
                    placeholder={index == 0 ? '-' : 'Generated'}
                    error={isFieldError(errors.participantList, 'email', index)}
                    helperText={getFieldParticipantErrorMessage(index, 'email')}
                    {...register(`participantList.${index}.email`)}
                  />
                </FormControl>
                <div />
              </div>
              <div className="reference-clinic-form__formwrapper">
                <FormControl fullWidth margin="dense">
                  <FormLabel className="reference-clinic__formlabel">Academic Group</FormLabel>
                  <TextField
                    size="small"
                    disabled
                    placeholder={index == 0 ? '-' : 'Generated'}
                    error={isFieldError(errors.participantList, 'academicGroupDesc', index)}
                    helperText={getFieldParticipantErrorMessage(index, 'academicGroupDesc')}
                    {...register(`participantList.${index}.academicGroupDesc`)}
                  />
                </FormControl>
                <div />
              </div>
              {fieldsParticipant[index].isLecturer && (
                <div className="reference-clinic-form__formwrapper">
                  <FormControl fullWidth margin="dense">
                    <FormLabel className="reference-clinic__formlabel">
                      Academic Organization
                    </FormLabel>
                    <TextField
                      size="small"
                      disabled
                      placeholder={index == 0 ? '-' : 'Generated'}
                      error={isFieldError(
                        errors.participantList,
                        'academicOrganizationDesc',
                        index,
                      )}
                      helperText={getFieldParticipantErrorMessage(
                        index,
                        'academicOrganizationDesc',
                      )}
                      {...register(`participantList.${index}.academicOrganizationDesc`)}
                    />
                  </FormControl>
                  <div />
                </div>
              )}
              {!fieldsParticipant[index].isLecturer && (
                <div className="reference-clinic-form__formwrapper">
                  <FormControl fullWidth margin="dense">
                    <FormLabel className="reference-clinic__formlabel">Academic Program</FormLabel>
                    <TextField
                      size="small"
                      disabled
                      placeholder={index == 0 ? '-' : 'Generated'}
                      error={isFieldError(errors.participantList, 'academicProgramDesc', index)}
                      helperText={getFieldParticipantErrorMessage(index, 'academicProgramDesc')}
                      {...register(`participantList.${index}.academicProgramDesc`)}
                    />
                  </FormControl>
                  <div />
                </div>
              )}
              {index > 0 && (
                <div className="reference-clinic-form__buttondelete">
                  <IconButton
                    color="error"
                    size="medium"
                    onClick={() => removeFieldParticipant(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
          ))}
        </FormControl>
      </form>
    </DialogForm>
  )
}

export default ReferenceClinicForm
