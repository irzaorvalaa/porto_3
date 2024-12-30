import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IBannerFilter } from '../interfaces'

export const initialStateBannerFilter: IBannerFilter = {
  year: '',
}

export const allOption: IGeneralFetch = {
  id: '',
  label: 'All',
}

export const allYear: IFormDataOption[] = [
  {
    value: '2021',
    label: '2021',
  },
  {
    value: '2022',
    label: '2022',
  },
  {
    value: '2023',
    label: '2023',
  },
  {
    value: '2024',
    label: '2024',
  },
  {
    value: '2025',
    label: '2025',
  },
]

export const arrBannerStatus: IFormDataOption[] = [
  {
    value: '',
    label: 'All',
  },
  {
    value: '1',
    label: 'Active',
  },
  {
    value: '0',
    label: 'Inactive',
  },
]