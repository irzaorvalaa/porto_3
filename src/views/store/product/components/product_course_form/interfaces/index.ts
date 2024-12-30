import {
  FormDataActionType,
  IFormDataDefault,
  IFormDataOption,
} from '../../../../../../interfaces/IFormData'
import { IProductFormCourseData } from '../../product_form/interfaces'

export interface IProductCourseFormProps {
  defaultValue?: IProductFormCourseData | null
  courseOptions?: IFormDataOption[]
  statusOptions?: IFormDataOption[]
  onSubmit?: (type: FormDataActionType, value: IProductFormCourseData) => void
  onClose?: () => void
}

export interface IProductCourseFormData extends IFormDataDefault {
  course?: string
  gugusMatkul?: string
  status?: string
}
