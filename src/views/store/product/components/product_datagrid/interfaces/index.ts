import { GridSelectionModel } from '@mui/x-data-grid'
import { IProduct } from '../../../interfaces'

export declare interface IProductDatagridProps {
  loading: boolean
  rows: IProduct[]
  onAdd?: () => void
  onEdit?: (value: IProduct) => void
  onDelete?: (value: IProduct) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
