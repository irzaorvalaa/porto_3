export type ILocalStateAction<T = any> =
  | { type: 'request' }
  | { type: 'success'; data: T }
  | { type: 'failure'; error: string }

export interface ILocalState<T = any> {
  data?: T
  isLoading: boolean
  error?: string
}
