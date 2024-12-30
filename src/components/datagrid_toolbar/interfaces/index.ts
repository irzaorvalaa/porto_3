export declare interface IDatagridToolbarProps {
  labelAddButton: string;
  labelDeleteButton: string;
  hideAddButton?: boolean;
  hideDeleteButton?: boolean;
  loading?: boolean;
  onDelete?: () => void;
  onAdd?: () => void;
}
