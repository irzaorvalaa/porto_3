import { GridSelectionModel } from '@mui/x-data-grid'
import { IReferenceClinic } from '../../../interfaces'

export declare interface IReferenceClinicDatagridProps {
  loading: boolean
  rows: IReferenceClinic[]
  onAdd?: () => void
  onEdit?: (value: IReferenceClinic) => void
  onDelete?: (value: IReferenceClinic) => void
  onDeleteBulk?: (values: GridSelectionModel) => void
}
