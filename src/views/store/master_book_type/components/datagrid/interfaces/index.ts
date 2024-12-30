import { GridSelectionModel } from '@mui/x-data-grid'
import { IBookType } from '../../../interfaces'

export declare interface IBookTypeDatagridProps {
  loading: boolean
  rows: IBookType[]
  onAdd?: () => void
  onEdit?: (value: IBookType) => void
  onDelete?: (value: IBookType) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
