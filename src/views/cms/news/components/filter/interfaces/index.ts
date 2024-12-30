import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface INewsFilterProps {
  yearOption?: IFormDataOption[]
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: INewsFilter) => void
}

export interface INewsFilter {
  year?: string
  campusID?: string
}
