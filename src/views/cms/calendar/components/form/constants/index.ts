import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { ICalendarFormData } from '../interfaces'

export const CalendarSchema = yup.object({
  label: yup.string().required().label('Name'),
  effDateStart: yup.string().required().label('Start Date'),
  effDateEnd: yup.string().required().label('End Date'),
  campusID: yup
    .array()
    .when('selAllCampus', {
      is: 'F',
      then: yup.array().min(1, 'Campus must be selected'),
      otherwise: (schema) => schema.notRequired(),
    })
    .label('Campus'),
})

export const initialCalendarFormdata: ICalendarFormData = {
  action: 'Add',
  id: '',
  label: '',
  effDateStart: '',
  effDateEnd: '',
  selAllCampus: 'F',
  campusID: [],
  campusName: [],
}