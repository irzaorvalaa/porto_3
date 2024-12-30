import { GridSelectionModel } from '@mui/x-data-grid'
import { IProductVariant } from '../../../interfaces'

export declare interface IProductVariantDatagridProps {
  loading: boolean
  rows: IProductVariant[]
  onAdd?: () => void
  onEdit?: (value: IProductVariant) => void
  onDelete?: (value: IProductVariant) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
