import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import { IPersistConfig } from '../interfaces/IPersistConfig'
import { PERSIST_SECRET_KEY } from '../constants/SecretKey'

const encryptor = encryptTransform({
  secretKey: PERSIST_SECRET_KEY,
  onError: (error) => {
    console.log('encryptTransform - error', error)
  },
})

const reduxPersist: IPersistConfig = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'root',
    storage,
    whitelist: ['auth'],
    transforms: [encryptor],
  },
}

export default reduxPersist
