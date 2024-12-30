import { IAuthState } from '../interfaces/IAuth'

export const initialAuthState: IAuthState = {
  isLoggedIn: false,
  token: null,
  isLoading: false,
  isValidating: false,
  error: null,
  user: {
    userID: '',
    name: '',
    email: '',
    photoUrl: '',
    assignedCampus: null,
    assignedAcademicProgram: null,
    assignedRole: null,
    defaultRoleID: '',
    defaultRoleName: '',
    defaultAssignedMenu: [],
  },
}
