import {
  IRoleManagementDetailState,
  IRoleManagementFormState,
  IRoleManagementMenuState,
  IRoleManagementState,
} from '../interfaces'

const initialStateRoleManagement: IRoleManagementState = {
  isLoading: false,
  data: [],
  error: '',
}

const initialStateRoleManagementForm: IRoleManagementFormState = {
  isLoading: false,
  data: null,
  error: '',
}

const initialStateRoleManagementMenu: IRoleManagementMenuState = {
  isLoading: false,
  data: [],
  error: '',
}

const initialStateRoleManagementDetail: IRoleManagementDetailState = {
  isLoading: false,
  data: null,
  error: '',
}

export {
  initialStateRoleManagement,
  initialStateRoleManagementForm,
  initialStateRoleManagementMenu,
  initialStateRoleManagementDetail,
}
