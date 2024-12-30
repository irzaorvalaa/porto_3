import { FormDataActionType, IFormDataDefault } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IProductFormDetailData } from '../../product_form/interfaces'

export interface IProductDetailFormProps {
  defaultValue?: IProductFormDetailData | null
  campusOptions?: IGeneralFetch[]
  bookTypeOptions?: IGeneralFetch[]
  loading?: boolean
  onSubmit?: (type: FormDataActionType, value: IProductFormDetailData) => void
  onClose?: () => void
}

export interface IProductDetailFormData extends IFormDataDefault {
  nib?: string
  campus?: string
  bookPhysic?: string
  collectionBookType?: string
  collectionAquisitionType?: string
  mediaType?: string
  condition?: string
  dateIn?: string
}
