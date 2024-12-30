import { GridSelectionModel } from '@mui/x-data-grid'
import { IAnnouncement } from '../../../interfaces'

export declare interface IAnnouncementDatagridProps {
  loading: boolean
  rows: IAnnouncement[]
  onAdd?: () => void
  onEdit?: (value: IAnnouncement) => void
  onDelete?: (value: IAnnouncement) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
