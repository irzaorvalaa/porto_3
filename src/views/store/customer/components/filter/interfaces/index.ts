import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface ICustomerFilterProps {
  loading?: boolean
  onShow?: (filter: ICustomerFilter) => void
}

export interface ICustomerFilter {}
