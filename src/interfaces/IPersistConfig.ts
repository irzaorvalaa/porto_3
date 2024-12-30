import { PersistConfig } from 'redux-persist'

export declare interface IPersistConfig {
  active: boolean
  reducerVersion: string
  storeConfig: PersistConfig<any>
}
