import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface IBannerFilterProps {
  yearOption?: IFormDataOption[]
  statusOption?: IFormDataOption[]
  loading?: boolean
  onShow?: (filter: IBannerFilter) => void
}

export interface IBannerFilter {
  year?: string
  status?: string
}
