import { all } from 'redux-saga/effects'
import reduxSaga from '../config/ReduxSaga'

export default function* appSaga() {
  yield all(reduxSaga)
}
