export declare interface IDatagridActionProps<T = any> {
  value?: T
  showEditButton?: boolean
  showDeleteButton?: boolean
  onEdit?: (value?: T) => void
  onDelete?: (value?: T) => void
}
