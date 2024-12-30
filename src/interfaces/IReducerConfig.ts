import { IAuthState } from './IAuth'
import { IAuthAction, ITalkToUsAction } from './IReduxAction'
import { ITalkToUsState } from './ITalkToUs'

export declare interface IReducerConfig {
  auth: (state: IAuthState | undefined, action: IAuthAction) => IAuthState
  talkToUs: (state: ITalkToUsState | undefined, action: ITalkToUsAction) => ITalkToUsState
}
