import * as yup from 'yup'
import { IFetchState, IMemberState, ITalkToUsFormData } from '../interfaces'

export const talkToUsSchema = yup.object({
  name: yup.string().required().label('Name'),
  waNumber: yup
    .string()
    .required()
    .matches(/^\d+$/, {
      message: 'Whatsapp Number must contain only numbers',
      excludeEmptyString: true,
    })
    .max(15)
    .label('Whatsapp Number'),
  campusID: yup.string().required().label('CampusID'),
  campusName: yup.string().required().label('Campus'),
  referenceTopicID: yup.string().required().label('TopicID'),
  referenceTopic: yup.string().required().label('Topic'),
  appointmentDate: yup.string().required().label('Appointment Date'),
  referenceScheduleID: yup.string().required().label('ScheduleID'),
  referenceSchedule: yup.string().required().label('Time Slot'),
})

export const initialTalkToUsFormdata: ITalkToUsFormData = {
  userID: '',
  binusianID: '',
  memberCode: '',
  name: '',
  email: '',
  academicGroup: '',
  academicGroupDesc: '',
  academicProgram: '',
  academicProgramDesc: '',
  academicOrganization: '',
  academicOrganizationDesc: '',
  isLecturer: 'F',
  waNumber: '',
  campusID: '',
  campusName: '',
  referenceTopicID: '',
  referenceTopic: '',
  appointmentDate: '',
  referenceScheduleID: '',
  referenceSchedule: '',
}

export const initialMemberState: IMemberState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialFetchState: IFetchState = {
  isLoading: false,
  data: [],
  error: '',
}
