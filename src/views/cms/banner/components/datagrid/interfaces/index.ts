import { GridSelectionModel } from '@mui/x-data-grid'
import { IBanner } from '../../../interfaces'

export declare interface IBannerDatagridProps {
  loading: boolean
  rows: IBanner[]
  onAdd?: () => void
  onEdit?: (value: IBanner) => void
  onDelete?: (value: IBanner) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
