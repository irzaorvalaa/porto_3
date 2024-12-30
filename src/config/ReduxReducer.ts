import { IReducerConfig } from '../interfaces/IReducerConfig'
import { AuthReducer } from '../redux/reducers/Auth.reducers'
import { TalkToUsReducer } from '../redux/reducers/TalkToUs.reducers'

const reduxReducer: IReducerConfig = {
  auth: AuthReducer,
  talkToUs: TalkToUsReducer,
}

export default reduxReducer
