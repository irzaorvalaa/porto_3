export declare interface IModalAlertProps {
  type: IModalAlertTypes
  message: string
  showCancelButton?: boolean
  showConfirmButton?: boolean
  labelCancelButton?: string
  labelConfirmButton?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export type IModalAlertTypes = 'error' | 'warning' | 'question' | 'success'

export declare interface IAlertType {
  className: string
  content: string
}

export declare interface IAlertTypeMemo {
  [s: string]: IAlertType
}
