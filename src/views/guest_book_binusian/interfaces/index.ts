import { IBECampus, ICampusDetail } from '../../../interfaces/ICampus'
import { IGeneralFetch } from '../../../interfaces/IGeneralFetch'
import { ILocalState } from '../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../interfaces/IResponse'

export interface IGuestBookMember {
  id: string | null
  binusianID: string | null
  memberCode: string | null
  name: string | null
  email: string | null
  campus: string | null
  campusDesc: string | null
  academicGroup: string | null
  academicGroupDesc: string | null
  academicOrganization: string | null
  academicOrganizationDesc: string | null
  academicProgram: string | null
  academicProgramDesc: string | null
  isLecturer: string | null
}

export interface IGuestBookMemberResponse extends IDefaultResponse {
  data: IGuestBookMember
}

export interface IGuestBookBinusianFormState extends ILocalState {
  data: IGuestBookMember | null
}

export interface IGuestBookBinusianCampusState extends ILocalState {
  data: IBECampus | null
}

export interface IGuestBookCampusListState extends ILocalState {
  data: IBECampus[]
}
