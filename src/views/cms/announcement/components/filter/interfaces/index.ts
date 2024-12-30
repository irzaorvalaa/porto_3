import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'

export interface IAnnouncementFilterProps {
  yearOption?: IFormDataOption[]
  campusOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IAnnouncementFilter) => void
}

export interface IAnnouncementFilter {
  year?: string
  campusID?: string
}
