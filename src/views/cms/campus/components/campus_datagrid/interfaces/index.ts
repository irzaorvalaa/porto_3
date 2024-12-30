import { GridSelectionModel } from '@mui/x-data-grid'
import { IBECampus } from '../../../../../../interfaces/ICampus'

export interface ICampusDatagridProps {
  loading: boolean
  rows: IBECampus[]
  onAdd?: () => void
  onEdit?: (value: IBECampus) => void
  onDelete?: (value: IBECampus) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
