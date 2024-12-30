import { GridSelectionModel } from '@mui/x-data-grid'
import { IUserManagement } from '../../../interfaces'

export declare interface IUserManagementDatagridProps {
  loading: boolean
  rows: IUserManagement[]
  onAdd?: () => void
  onEdit?: (value: IUserManagement) => void
  onDelete?: (value: IUserManagement) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
