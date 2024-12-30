import * as yup from 'yup'
import { IRoleManagementFormData } from '../interfaces'

const RoleManagementSchema = yup.object({
  name: yup.string().required().label('Name'),
  listRead: yup.array(yup.string()).min(1).label('Menu'),
  listCreate: yup.array(yup.string()).label('Menu'),
  listUpdate: yup.array(yup.string()).label('Menu'),
  listDelete: yup.array(yup.string()).label('Menu'),
})

const initialRoleManagementFormdata: IRoleManagementFormData = {
  action: 'Add',
  id: '',
  name: '',
  listRead: [],
  listCreate: [],
  listUpdate: [],
  listDelete: [],
}

export { RoleManagementSchema, initialRoleManagementFormdata }
