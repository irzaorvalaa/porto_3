import * as React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Tooltip,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { FORMAT_DATE_INPUT, FORMAT_DATE_POST } from '../../constants/Parameter'
import isFieldError from '../../utilities/isFieldError'
import { savedSuccessMessage } from '../../constants/SuccessMessage'
import {
  talkToUsSchema,
  initialTalkToUsFormdata,
  initialMemberState,
  initialFetchState,
} from './constants'
import { IFetchData, IMember, ITalkToUsFormData, ITalkToUsProps } from './interfaces'
import { useLocalState } from '../../helpers/useLocalState'
import { fetchTalkToUs, confirmTalkToUs } from '../../views/talk_to_us_monitor/utilities'

// Icons
import { ReactComponent as CloseIcon } from '../../assets/svg/icons/close.svg'
import { fetchCampus, getReference, getTopic, lookupByEmail, saveReference } from './utilities'
import { ICampus } from '../../interfaces/ICampus'
import { initialCampusState } from '../../constants/CampusState'
import { initialStateTalkToUs } from '../../views/talk_to_us_monitor/constants'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TalkToUs = ({ user, open, onClose, ...other }: ITalkToUsProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const controller = new AbortController()
  const navigate = useNavigate()

  // AutoFocus Ref
  const autoFocusRef = React.useRef<HTMLDivElement>(null)

  // State
  const { reducer: memberReducer } = useLocalState<IMember | null>()
  const { reducer: campusReducer } = useLocalState<ICampus[]>()
  const { reducer: topicReducer } = useLocalState<IFetchData[]>()
  const { reducer: timeSlotReducer } = useLocalState<IFetchData[]>()
  const { reducer } = useLocalState()
  const [state, dispatch] = React.useReducer(reducer, initialStateTalkToUs)
  const [memberState, memberDispatch] = React.useReducer(memberReducer, initialMemberState)
  const [campusState, campusDispatch] = React.useReducer(campusReducer, initialCampusState)
  const [topicState, topicDispatch] = React.useReducer(topicReducer, initialFetchState)
  const [timeSlotState, timeSlotDispatch] = React.useReducer(timeSlotReducer, initialFetchState)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [selectedCampus, setSelectedCampus] = React.useState<ICampus | null>(null)
  const [selectedTopic, setSelectedTopic] = React.useState<IFetchData | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<IFetchData | null>(null)
  const [date, setDate] = React.useState<null | Date>(null)

  // Form Hook
  const {
    handleSubmit,
    reset,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<ITalkToUsFormData>({
    defaultValues: initialTalkToUsFormdata,
    resolver: yupResolver(talkToUsSchema),
  })

  const fetchDataMember = React.useCallback(async () => {
    try {
      memberDispatch({ type: 'request' })

      const email = user ? user.email : '-'
      const response = await lookupByEmail(email, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      memberDispatch({ type: 'success', data })

      return data
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      memberDispatch({ type: 'failure', error: errorMessage })

      return null
    }
  }, [])

  const fetchDataCampus = React.useCallback(async () => {
    try {
      campusDispatch({ type: 'request' })

      const response = await fetchCampus(controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      campusDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      campusDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const fetchDataTopic = React.useCallback(async (campusID: string) => {
    try {
      topicDispatch({ type: 'request' })

      const response = await getTopic(campusID, controller.signal)

      const { data, status, message } = response.data

      if (!status) throw message

      topicDispatch({ type: 'success', data })
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      topicDispatch({ type: 'failure', error: errorMessage })
    }
  }, [])

  const fetchDataReference = React.useCallback(
    async (campusID: string, appointmentDate: string) => {
      try {
        timeSlotDispatch({ type: 'request' })

        const response = await getReference(campusID, appointmentDate, controller.signal)

        const { data, status, message } = response.data

        if (!status) throw message

        timeSlotDispatch({ type: 'success', data })
      } catch (err) {
        const errorMessage = err as string

        if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

        timeSlotDispatch({ type: 'failure', error: errorMessage })
      }
    },
    [],
  )

  const onSubmit = async (values: ITalkToUsFormData) => {
    try {
      setIsSaving(true)

      const postData: ITalkToUsFormData = {
        ...values,
        campusID: selectedCampus?.id ?? '',
        campusName: selectedCampus?.name ?? '',
        referenceTopicID: selectedTopic?.id ?? '',
        referenceTopic: selectedTopic?.label ?? '',
        referenceScheduleID: selectedTimeSlot?.id ?? '',
        referenceSchedule: selectedTimeSlot?.label ?? '',
      }

      const response = await saveReference(postData, controller.signal)

      const { status, message } = response.data

      if (!status) throw message

      enqueueSnackbar(savedSuccessMessage, {
        variant: 'success',
      })

      onClose?.()

      setIsSaving(false)

      // fetchData()

      // navigate('/talk_to_us', { replace: true })

      window.location.reload();
      
    } catch (err) {
      const errorMessage = err as string

      if (errorMessage !== 'canceled') enqueueSnackbar(errorMessage, { variant: 'error' })

      setIsSaving(false)
    }
  }

  const onEnter = async () => {
    autoFocusRef.current?.focus()

    let member: IMember | null = memberState.data ?? null
    if (!member) {
      member = await fetchDataMember()
    }

    setValue('userID', member?.id ?? '')
    setValue('binusianID', member?.binusianID ?? '')
    setValue('memberCode', member?.memberCode ?? '')
    setValue('name', member?.name ?? '')
    setValue('email', member?.email ?? '')
    setValue('academicGroup', member?.academicGroup ?? '')
    setValue('academicGroupDesc', member?.academicGroupDesc ?? '')
    setValue('academicProgram', member?.academicProgram ?? '')
    setValue('academicProgramDesc', member?.academicProgramDesc ?? '')
    setValue('academicOrganization', member?.academicOrganization ?? '')
    setValue('academicOrganizationDesc', member?.academicOrganizationDesc ?? '')
    setValue('isLecturer', member?.isLecturer ?? '')

    if (campusState.data?.length === 0) {
      await fetchDataCampus()
    }
  }

  const onExit = () => {
    setSelectedCampus(null)
    setSelectedTopic(null)
    setSelectedTimeSlot(null)
    setDate(null)
    reset(initialTalkToUsFormdata)
  }

  const handleClose = (reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return
    }

    onClose?.()
  }

  const handleCampusChange = async (campus: ICampus | null) => {
    setSelectedCampus(campus)
    setSelectedTopic(null)
    setSelectedTimeSlot(null)
    setDate(null)

    setValue('campusID', campus?.id ?? '')

    topicDispatch({ type: 'success', data: [] })
    timeSlotDispatch({ type: 'success', data: [] })

    if (campus) {
      await fetchDataTopic(campus.id)
    }
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

      setValue('appointmentDate', newValue)

      await fetchDataReference(selectedCampus ? selectedCampus.id : '', newValue)
    } else {
      setValue('appointmentDate', '')
      timeSlotDispatch({ type: 'success', data: [] })
    }
  }

  React.useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => handleClose(reason)}
      TransitionComponent={Transition}
      TransitionProps={{
        onEnter: onEnter,
        onExit: onExit,
      }}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
      {...other}
    >
      <DialogTitle className="dialog-form__title">
        <div>Talk to Us</div>

        <Tooltip title="Close">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form>
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Member Code</FormLabel>
          <TextField
            size="small"
            placeholder={memberState.isLoading ? 'Loading...' : ''}
            disabled
            error={isFieldError(errors, 'memberCode')}
            helperText={errors.memberCode?.message}
            {...register('memberCode')}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Name</FormLabel>
          <TextField
            size="small"
            placeholder={memberState.isLoading ? 'Loading...' : ''}
            disabled
            error={isFieldError(errors, 'name')}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Email</FormLabel>
          <TextField
            size="small"
            placeholder={memberState.isLoading ? 'Loading...' : ''}
            disabled
            error={isFieldError(errors, 'email')}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </FormControl>

          {memberState.data?.isLecturer == 'F' && (
            <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Academic Program</FormLabel>
            <TextField
              size="small"
              placeholder={memberState.isLoading ? 'Loading...' : ''}
              disabled
              error={isFieldError(errors, 'academicProgramDesc')}
              helperText={errors.academicProgramDesc?.message}
              {...register('academicProgramDesc')}
            />
          </FormControl>
          )}

          {memberState.data?.isLecturer == 'T' && (
            <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Academic Organization</FormLabel>
            <TextField
              size="small"
              placeholder={memberState.isLoading ? 'Loading...' : ''}
              disabled
              error={isFieldError(errors, 'academicOrganizationDesc')}
              helperText={errors.academicOrganizationDesc?.message}
              {...register('academicOrganizationDesc')}
            />
          </FormControl>
          )}

<FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Whatsapp Number *</FormLabel>
            <TextField
              size="small"
              placeholder={memberState.isLoading ? 'Loading...' : 'Type here'}
              error={isFieldError(errors, 'waNumber')}
              helperText={errors.waNumber?.message}
              {...register('waNumber')}
            />
          </FormControl>

          <FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Campus *</FormLabel>
          <Controller
            control={control}
            name="campusName"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedCampus}
                options={campusState.data as ICampus[]}
                onChange={(_, newValue) => {
                  onChange(newValue?.name)
                  handleCampusChange(newValue)
                }}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                loading={campusState.isLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Please Select" 
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {campusState.isLoading && <CircularProgress size={24} />}
                          {params.InputProps.endAdornment}
                        </InputAdornment>
                      ),
                    }}
                    error={isFieldError(errors, 'campusName')}
                    helperText={errors.campusName?.message}
                  />
                )}
              />
            )}
          />
</FormControl>
<FormControl fullWidth margin="dense">
          <FormLabel className="complex-form__formlabel">Topic *</FormLabel>
          <Controller
            control={control}
            name="referenceTopic"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedTopic}
                options={topicState.data as IFetchData[]}
                onChange={(_, newValue) => {
                  onChange(newValue?.label)
                  setValue('referenceTopicID', newValue?.id ?? '')
                  setSelectedTopic(newValue)
                }}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                loading={topicState.isLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Please Select" 
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {topicState.isLoading && <CircularProgress size={24} />}
                          {params.InputProps.endAdornment}
                        </InputAdornment>
                      ),
                    }}
                    error={isFieldError(errors, 'referenceTopic')}
                    helperText={errors.referenceTopic?.message}
                  />
                )}
              />
            )}
          />
</FormControl>
<FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Appointment Date *</FormLabel>
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
                  error={isFieldError(errors, 'appointmentDate')}
                  helperText={errors.appointmentDate?.message}
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
                  size="small"
                  error={isFieldError(errors, 'appointmentDate')}
                  helperText={errors.appointmentDate?.message}
                />
              )}
            />
          </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <FormLabel className="complex-form__formlabel">Time Slot *</FormLabel>
          <Controller
            control={control}
            name="referenceSchedule"
            render={({ field: { onChange } }) => (
              <Autocomplete
                value={selectedTimeSlot}
                options={timeSlotState.data as IFetchData[]}
                onChange={(_, newValue) => {
                  onChange(newValue?.label)
                  setValue('referenceScheduleID', newValue?.id ?? '')
                  setSelectedTimeSlot(newValue)
                }}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                loading={timeSlotState.isLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Please select"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {timeSlotState.isLoading && <CircularProgress size={24} />}
                          {params.InputProps.endAdornment}
                        </InputAdornment>
                      ),
                    }}
                    error={isFieldError(errors, 'referenceSchedule')}
                    helperText={errors.referenceSchedule?.message}
                  />
                )}
              />
            )}
          />
          </FormControl>

        </form>
      </DialogContent>
      <Divider />
      <DialogActions className="dialog-form__actions">
        <LoadingButton
          fullWidth
          variant="contained"
          size="large"
          className="button button--secondary-fe"
          disableElevation
          loading={isSaving}
          disabled={isSaving || memberState.isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {memberState.isLoading ? 'Loading...' : 'Submit'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default TalkToUs
