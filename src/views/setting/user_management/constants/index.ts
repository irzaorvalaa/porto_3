import {
  IUserManagement,
  IUserManagementDetailState,
  IUserManagementFormState,
  IUserManagementState,
  IFetchCampusStatus,
  IFetchAcademicProgramStatus,
  IFetchRoleStatus,
  IFetchLookupBinusianStatus,
} from '../interfaces'

export const initialStateUserManagement: IUserManagementState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateUserManagementDetail: IUserManagementDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateUserManagementForm: IUserManagementFormState = {
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

export const initialStateRole: IFetchRoleStatus = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateLookupBinusian: IFetchLookupBinusianStatus = {
  isLoading: false,
  data: [],
  error: '',
}
