import * as yup from 'yup'
import { IProductCourseFormData } from '../interfaces'

export const masterCollectionCourseSchema = yup.object({
  course: yup.string().required().label('Course'),
  gugusMatkul: yup.string().required().label('Field of Study'),
  status: yup.string().required().label('Status'),
})

export const initialProductCourseFormdata: IProductCourseFormData = {
  action: 'Add',
  id: '',
  course: '',
  gugusMatkul: '',
  status: '',
}
