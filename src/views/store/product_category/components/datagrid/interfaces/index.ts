import { GridSelectionModel } from '@mui/x-data-grid'
import { IProductCategory } from '../../../interfaces'

export declare interface IProductCategoryDatagridProps {
  loading: boolean
  rows: IProductCategory[]
  onAdd?: () => void
  onEdit?: (value: IProductCategory) => void
  onDelete?: (value: IProductCategory) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
