import { useDispatch } from 'react-redux'
import { AppDispatch } from '../bootstrap/App.store'

export const useAppDispatch = (): any => useDispatch<AppDispatch>()
