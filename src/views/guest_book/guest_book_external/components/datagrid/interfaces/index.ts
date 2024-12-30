import { GridSelectionModel } from '@mui/x-data-grid'
import { IGuestBookExternal } from '../../../interfaces'

export declare interface IGuestBookExternalDatagridProps {
  loading: boolean
  rows: IGuestBookExternal[]
  onAdd?: () => void
  onEdit?: (value: IGuestBookExternal) => void
  onDelete?: (value: IGuestBookExternal) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
