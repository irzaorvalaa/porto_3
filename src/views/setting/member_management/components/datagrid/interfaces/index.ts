import { GridSelectionModel } from '@mui/x-data-grid'
import { IMemberManagement } from '../../../interfaces'

export declare interface IMemberManagementDatagridProps {
  loading: boolean
  rows: IMemberManagement[]
  onAdd?: () => void
  onEdit?: (value: IMemberManagement) => void
  onDelete?: (value: IMemberManagement) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
