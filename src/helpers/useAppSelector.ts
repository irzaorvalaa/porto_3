import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../bootstrap/App.reducers'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
