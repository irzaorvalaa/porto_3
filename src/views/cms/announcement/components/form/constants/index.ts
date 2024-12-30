import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IAnnouncementFormData } from '../interfaces'

export const AnnouncementSchema = yup.object({
  title: yup.string().required().label('Title'),
  effDateStart: yup.string().required().label('Start Date'),
  effDateEnd: yup.string().required().label('End Date'),
  description: yup.string().nullable().label('Description'),
  campusID: yup
    .array()
    .when('selAllCampus', {
      is: 'F',
      then: yup.array().min(1, 'Campus must be selected'),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Campus'),
})

export const initialAnnouncementFormdata: IAnnouncementFormData = {
  action: 'Add',
  id: '',
  fileName: '',
  fileData: '',
  title: '',
  effDateStart: '',
  effDateEnd: '',
  selAllCampus: 'F',
  campusID: [],
  campusName: [],
  description: '',
}