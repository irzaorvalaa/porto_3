import { IGeneralFetch } from '../../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../../interfaces/IFormData'

export interface IAddressFilterProps {
  loading?: boolean
  onShow?: (filter: IAddressFilter) => void
}

export interface IAddressFilter {}
