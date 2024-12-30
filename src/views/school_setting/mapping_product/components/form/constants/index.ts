import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IMappingProductFormData } from '../interfaces'

export const MappingProductSchema = yup.object({
  campusID: yup.string().required().label('Campus'),
  label: yup.string().required().label('Label'),
  dayName: yup.string().required().label('Day'),
  startTime: yup.string().required().label('Start Time'),
  endTime: yup.string().required().label('End Time'),
})

export const initialMappingProductFormdata: IMappingProductFormData = {
  action: 'Add',
  id: '',
  label: '',
  campusID: '',
  campusName: '',
  dayName: '',
  startTime: '',
  endTime: '',
}

export const allDayName: IFormDataOption[] = [
  {
    value: 'Monday',
    label: 'Monday',
  },
  {
    value: 'Tuesday',
    label: 'Tuesday',
  },
  {
    value: 'Wednesday',
    label: 'Wednesday',
  },
  {
    value: 'Thursday',
    label: 'Thursday',
  },
  {
    value: 'Friday',
    label: 'Friday',
  },
  {
    value: 'Saturday',
    label: 'Saturday',
  },
  {
    value: 'Sunday',
    label: 'Sunday',
  },
]
