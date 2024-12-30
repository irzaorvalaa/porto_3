import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface IGuestBookExternalFilterProps {
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IGuestBookExternalFilter) => void
}

export interface IGuestBookExternalFilter {
  campusID?: string
  startDate?: string
  endDate?: string
}
