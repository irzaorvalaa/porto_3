import {
  IMemberManagement,
  IMemberManagementDetailState,
  IMemberManagementFormState,
  IMemberManagementState,

  IFetchCampusStatus,
  IFetchAcademicProgramStatus,
  IFetchAcademicOrganizationStatus,
  IFetchAcademicGroupStatus,
} from '../interfaces'

export const initialStateMemberManagement: IMemberManagementState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateMemberManagementDetail: IMemberManagementDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateMemberManagementForm: IMemberManagementFormState = {
  isLoading: false,
  data: null,
  error: '',
}

export const initialStateCampus: IFetchCampusStatus = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAcademicProgram: IFetchAcademicProgramStatus = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAcademicOrganization: IFetchAcademicOrganizationStatus = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateAcademicGroup: IFetchAcademicGroupStatus = {
  isLoading: false,
  data: [],
  error: '',
}