import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IBTSPeriodFormData } from '../interfaces'

export const BTSPeriodSchema = yup.object({
  label: yup.string().required().label('Name'),
  campusID: yup
    .array()
    .when('selAllCampus', {
      is: 'F',
      then: yup.array().min(1, 'Campus must be selected'),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Campus'),
})

export const initialBTSPeriodFormdata: IBTSPeriodFormData = {
  action: 'Add',
  id: '',
  label: '',
  selAllCampus: 'F',
  campusID: [],
  campusName: [],
}
