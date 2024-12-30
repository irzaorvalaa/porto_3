import { ILocalState } from './ILocalState'
import { IDefaultResponse } from './IResponse'

export interface ICampus {
  id: string
  campusImgUrl: string
  name: string
  email: string
  address: string
  serviceHour: ICampusServiceHour[]
}

export interface ICampusDetail extends ICampus {
  phoneNumberExt: string
  phoneNumberWA: string
  provideLockerBorrowing: boolean
  assignedPIC: ICampusAssignedPIC[]
  careerData: ICampusCareerData[]
}

export interface ICampusServiceHour {
  dayName: string
  dayOrder?: number
  startTime: string
  endTime: string
}

export interface ICampusAssignedPIC {
  userId: string
  binusianId: string
  name: string
  email: string
}

export interface ICampusCareerData {
  institution: string
  academicCareer: string
}

export interface IBECampus {
  id: string
  name: string
  email: string
  phoneNumberExt: string
  phoneNumberWA: string
  picEmail: string
  picCampus: string
  provideLockerBorrowing: 'T' | 'F'
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface IBECampusDetail extends IBECampus {
  photoUrl: string | null
  address: string | null
  serviceHours: ICampusServiceHour[]
  picAssignations: ICampusAssignedPIC[]
}

export interface ICampusResponse extends IDefaultResponse {
  data: ICampus[]
}

export interface ICampusState extends ILocalState {
  data: ICampus[]
}

export interface ICampusDetailState extends ILocalState {
  data: ICampusDetail | null
}

export interface ICampusDetailResponse extends IDefaultResponse {
  data: ICampusDetail | null
}
