import { GridSelectionModel } from '@mui/x-data-grid'
import { IBTSPeriod } from '../../../interfaces'

export declare interface IBTSPeriodDatagridProps {
  loading: boolean
  rows: IBTSPeriod[]
  onAdd?: () => void
  onEdit?: (value: IBTSPeriod) => void
  onDelete?: (value: IBTSPeriod) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
