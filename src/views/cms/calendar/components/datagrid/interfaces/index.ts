import { GridSelectionModel } from '@mui/x-data-grid'
import { ICalendar } from '../../../interfaces'

export declare interface ICalendarDatagridProps {
  loading: boolean
  rows: ICalendar[]
  onAdd?: () => void
  onEdit?: (value: ICalendar) => void
  onDelete?: (value: ICalendar) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
