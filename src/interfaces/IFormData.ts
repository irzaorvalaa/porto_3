export type FormDataActionType = 'Add' | 'Edit' | 'Delete'

export declare interface IFormDataDefault {
  action: FormDataActionType
  id?: string
}

export declare interface IFormDataOption {
  value: string
  label: string
}
