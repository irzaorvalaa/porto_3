import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { INewsFilter } from '../interfaces'

export const initialStateNewsFilter: INewsFilter = {
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