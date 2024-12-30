import { IRoleManagement } from '../../../interfaces'

export declare interface IRoleManagementDatagridProps {
  loading: boolean
  rows: IRoleManagement[]
  onAdd?: () => void
  onEdit?: (value?: IRoleManagement) => void
  onDelete?: (value?: IRoleManagement) => void
}
