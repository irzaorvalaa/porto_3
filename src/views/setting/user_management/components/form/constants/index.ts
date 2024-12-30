import * as yup from 'yup'
import { IUserManagementFormData } from '../interfaces'

export const UserManagementSchema = yup.object({
  isBinusian: yup.string().required().label('User Type'),
  binusianID: yup
    .string()
    .when('isBinusian', {
      is: 'T',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .uppercase()
    .label('Binusian ID'),
  email: yup.string().email().required().lowercase().label('Email'),
  name: yup.string().required().uppercase().label('Name'),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, {
      message: 'Phone Number must contain only numbers',
      excludeEmptyString: true,
    })
    .max(15)
    .label('Phone Number'),
  password: yup
    .string()
    .when('isBinusian', {
      is: (isBinusian: string) => isBinusian == 'External' || isBinusian == 'F',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Password'),
  campusID: yup
    .array()
    .when(['isBinusian', 'selAllCampus'], {
      is: (isBinusian: string, selAllCampus: string) =>
        (isBinusian == 'Binusian' || isBinusian == 'T') && selAllCampus == 'F',
      then: yup.array().min(1, 'Campus must be selected'),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Campus'),
  roleID: yup.array().min(1, 'Role must be selected'),
})

export const initialUserManagementFormdata: IUserManagementFormData = {
  action: 'Add',
  id: '',
  isBinusian: '',
  name: '',
  email: '',
  selAllCampus: 'F',
  campusID: [],
  campusName: [],
  academicProgram: [],
  academicProgramDesc: [],
  roleID: [],
  roleName: [],
  binusianID: '',
  phoneNumber: '',
  institutionName: '',
  institutionAddress: '',
  password: '',
}
