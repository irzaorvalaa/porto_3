import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface IMappingProductFilterProps {
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IMappingProductFilter) => void
}

export interface IMappingProductFilter {
  campusID?: string
}
