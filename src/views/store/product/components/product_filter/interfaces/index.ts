import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IProductFilterProps {
  collectionTypeOptions?: IGeneralFetch[]
  loading?: boolean
  onShow?: (filter: IProductFilter) => void
}

export interface IProductFilter {
  CollectionTypeID?: string
  Subject?: string
  Title?: string
  Bibli?: string
  Author?: string
  Publisher?: string
}
