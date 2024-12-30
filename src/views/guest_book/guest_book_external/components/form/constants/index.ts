import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IGuestBookExternalFormData } from '../interfaces'

export const GuestBookExternalSchema = yup.object({
  identityNumber: yup.string().required().label('Identity No.'),
  identityType: yup.string().required().label('Identity Type'),
  campusId: yup.string().required().label('Campus'),
  name: yup.string().required().label('Name'),
  email: yup.string().email().nullable().label('Email'),
  institutionName: yup.string().required().label('Institution'),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, {
      message: 'Phone Number must contain only numbers',
      excludeEmptyString: true,
    })
    .max(15)
    .label('Phone Number'),
  needs: yup.string().required().label('Needs'),
})

export const initialGuestBookExternalFormdata: IGuestBookExternalFormData = {
  action: 'Add',
  id: '',
  isBinusian: 'F',
  identityNumber: '',
  identityType: '',
  campusId: '',
  campusName: '',
  name: '',
  email: '',
  institutionName: '',
  phoneNumber: '',
  needs: '',
}


export const arrIdentity: IFormDataOption[] = [
  {
    value: 'SIM',
    label: 'SIM',
  },
  {
    value: 'KTP',
    label: 'KTP',
  },
]