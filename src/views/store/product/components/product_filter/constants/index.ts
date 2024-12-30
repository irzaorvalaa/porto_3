import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IProductFilter } from '../interfaces'

export const initialStateProductFilter: IProductFilter = {
  CollectionTypeID: '',
  Subject: '',
  Title: '',
  Bibli: '',
  Author: '',
  Publisher: '',
}

export const allOptions: IGeneralFetch = {
  id: '',
  label: 'All',
}
