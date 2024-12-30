import { GridSelectionModel } from '@mui/x-data-grid'
import { IMerchant } from '../../../interfaces'

export declare interface IMerchantDatagridProps {
  loading: boolean
  rows: IMerchant[]
  onAdd?: () => void
  onEdit?: (value: IMerchant) => void
  onDelete?: (value: IMerchant) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
