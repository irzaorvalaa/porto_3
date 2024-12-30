import { DialogProps } from '@mui/material'
import { ILocalState } from '../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../interfaces/IResponse'
import { IAuthValidate } from '../../../interfaces/IAuth'

export interface ITalkToUsProps extends DialogProps {
  user?: IAuthValidate | null
  open: boolean
  onClose?: () => void
}

export interface ITalkToUsFormData {
  userID?: string
  binusianID?: string
  memberCode?: string
  name?: string
  email?: string
  academicGroup?: string
  academicGroupDesc?: string
  academicProgram?: string
  academicProgramDesc?: string
  academicOrganization?: string
  academicOrganizationDesc?: string
  isLecturer?: string
  waNumber?: string
  campusID?: string
  campusName?: string
  referenceTopicID?: string
  referenceTopic?: string
  appointmentDate?: string
  referenceScheduleID?: string
  referenceSchedule?: string
}

export interface IMember {
  id: string
  binusianID: string
  isLecturer: string
  memberCode: string
  name: string
  email: string
  campus: string | null
  campusDesc: string | null
  academicGroup: string | null
  academicGroupDesc: string | null
  academicProgram: string | null
  academicProgramDesc: string | null
  academicOrganization: string | null
  academicOrganizationDesc: string | null
}

export interface IFetchData {
  id: string
  label: string
}

export interface IMemberResponse extends IDefaultResponse {
  data: IMember
}

export interface IMemberState extends ILocalState {
  data: IMember | null
}

export interface IFetchResponse extends IDefaultResponse {
  data: IFetchData[]
}

export interface IFetchState extends ILocalState {
  data: IFetchData[]
}
