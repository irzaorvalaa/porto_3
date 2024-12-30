import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { INewsFormData } from '../interfaces'

export const NewsSchema = yup.object({
  isEvent: yup.string().required().label('Category'),
  date: yup.string().required().label('Publish Date'),
  title: yup.string().required().label('Title'),
  caption: yup.string().nullable().label('Caption'),
  description: yup.string().nullable().label('Description'),
  author: yup.string().required().label('Author'),
  campusID: yup
    .array()
    .when('selAllCampus', {
      is: 'F',
      then: yup.array().min(1, 'Campus must be selected'),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Campus'),
})

export const initialNewsFormdata: INewsFormData = {
  action: 'Add',
  id: '',
  fileName: '',
  fileData: '',
  title: '',
  author: '',
  date: '',
  selAllCampus: 'F',
  campusID: [],
  campusName: [],
  caption: '',
  description: '',
}

export const arrNewsCategory: IFormDataOption[] = [
  {
    value: 'F',
    label: 'News',
  },
  {
    value: 'T',
    label: 'Event',
  },
]