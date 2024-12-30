import { GridSelectionModel } from '@mui/x-data-grid'
import { ICustomer } from '../../../interfaces'

export declare interface ICustomerDatagridProps {
  loading: boolean
  rows: ICustomer[]
  onAdd?: () => void
  onEdit?: (value: ICustomer) => void
  onDelete?: (value: ICustomer) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
