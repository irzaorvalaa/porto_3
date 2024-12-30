import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface IBTSPeriodFilterProps {
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IBTSPeriodFilter) => void
}

export interface IBTSPeriodFilter {
  campusID?: string
}
