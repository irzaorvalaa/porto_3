import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IReferenceClinicFormData } from '../interfaces'

// Variable for test
let appointmentStatusTmp: string | undefined

export const referenceClinicSchema = yup.object({
  appointmentDate: yup
    .string()
    .required()
    .test({
      name: 'appointmentDateValid',
      test: (value, context) => {
        if (value && value.includes('Invalid date')) {
          return context.createError({
            type: 'appointmentDateValid',
            message: 'Appointment Date must be a valid date',
          })
        }

        return true
      },
    })
    .label('Appointment Date'),
  timeSlot: yup.string().required().label('Time Slot'),
  appointmentStatus: yup
    .string()
    .required()
    .test('appointmentStatusTmp', 'assign value to variable appointmentStatusTmp', (value) => {
      appointmentStatusTmp = value
      return true
    })
    .label('Appointment Status'),
  attendStatus: yup
    .string()
    .required()
    .oneOf(['T', 'F'], 'Attend Status is a required field')
    .label('Attend Status'),
  zoomLink: yup
    .string()
    .when('appointmentStatus', {
      is: (val: string) => val == '2', // 2 = only confirmed
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Zoom Link'),
  picList: yup
    .array()
    .of(
      yup.object({
        userId: yup.string().default('').label('User ID'),
        binusianId: yup
          .string()
          .test('appointmentStatusTest', 'PIC Binusian ID is a required field', (value) => {
            return appointmentStatusTmp == '2' && !value ? false : true // 2 = only confirmed
          })
          .label('PIC Binusian ID'),
        name: yup.string().default('').label('PIC Name'),
        email: yup.string().default('').label('PIC Email'),
      }),
    )
    .min(1)
    .label('PIC Librarian'),
  participantList: yup
    .array()
    .of(
      yup.object({
        userId: yup.string().required().label('User ID'),
        memberCode: yup.string().required().label('Member Code'),
        name: yup.string().default('').label('Name'),
        email: yup.string().default('').label('Email'),
        academicGroup: yup.string().default('').label('Academic Group'),
        academicGroupDesc: yup.string().default('').label('Academic Group Description'),
        academicProgram: yup.string().default('').label('Academic Program'),
        academicProgramDesc: yup.string().default('').label('Academic Program Description'),
        academicOrganization: yup.string().default('').label('Academic Organization'),
        academicOrganizationDesc: yup
          .string()
          .default('')
          .label('Academic Organization Description'),
      }),
    )
    .min(1)
    .label('Participant/Attendees'),
})

export const initialReferenceClinicFormdata: IReferenceClinicFormData = {
  action: 'Add',
  id: '',
  appointmentDate: '',
  timeSlot: '',
  referenceScheduleID: '',
  picUserID: [''],
  picBinusianID: [''],
  picName: [''],
  picEmail: [''],
  picList: [
    {
      userId: '',
      binusianId: '',
      name: '',
      email: '',
    },
  ],
  participantUserID: [''],
  memberCode: [''],
  participantName: [''],
  participantEmail: [''],
  participantAcademicGroup: [''],
  participantAcademicGroupDesc: [''],
  participantAcademicProgram: [''],
  participantAcademicProgramDesc: [''],
  participantAcademicOrganization: [''],
  participantAcademicOrganizationDesc: [''],
  participantList: [
    {
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
    },
  ],
  appointmentStatus: '',
  attendStatus: '',
  zoomLink: '',
}

export const attendStatusOptions: IFormDataOption[] = [
  {
    value: 'T',
    label: 'Attended',
  },
  {
    value: 'F',
    label: 'Not Attended',
  },
]

export const appointmentStatusOptions: IFormDataOption[] = [
  {
    value: '1',
    label: 'Waiting Confirmation by Librarian',
  },
  {
    value: '2',
    label: 'Confirmed',
  },
  {
    value: '3',
    label: 'Rescheduled, need requestor confirmation',
  },
  {
    value: '4',
    label: 'Cancelled',
  },
]
