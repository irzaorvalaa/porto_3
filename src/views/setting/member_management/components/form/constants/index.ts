import * as yup from 'yup'
import { IMemberManagementFormData } from '../interfaces'

export const MemberManagementSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, {
      message: 'Phone Number must contain only numbers',
      excludeEmptyString: true,
    })
    .max(15)
    .label('Phone Number')
    .nullable(),
})

export const initialMemberManagementFormdata: IMemberManagementFormData = {
  action: 'Edit',
  id: '',
  binusianID: '',
  memberCode: '',
  name: '',
  email: '',

  campusID: '',
  campusName: '',
  academicProgram: '',
  academicProgramDesc: '',
  academicOrganization: '',
  academicOrganizationDesc: '',
  phoneNumber: '',
  address: '',
  expiredDate: '',
}