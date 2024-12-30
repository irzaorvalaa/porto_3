import { GridSelectionModel } from '@mui/x-data-grid'
import { INews } from '../../../interfaces'

export declare interface INewsDatagridProps {
  loading: boolean
  rows: INews[]
  onAdd?: () => void
  onEdit?: (value: INews) => void
  onDelete?: (value: INews) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
