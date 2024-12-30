import { GridSelectionModel } from '@mui/x-data-grid'
import { IMappingProduct } from '../../../interfaces'

export declare interface IMappingProductDatagridProps {
  loading: boolean
  rows: IMappingProduct[]
  onAdd?: () => void
  onEdit?: (value: IMappingProduct) => void
  onDelete?: (value: IMappingProduct) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
