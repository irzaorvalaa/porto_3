import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit'
import hookReducer from '../helpers/hookReducer'
import reduxReducer from '../config/ReduxReducer'

const rootReducer = combineReducers(reduxReducer)

export type RootState = ReturnType<typeof rootReducer>

const hooks: Reducer = (state: RootState, action: AnyAction) => {
  const hook = hookReducer(state, action)
  return rootReducer(hook.state, hook.action)
}

export default hooks
