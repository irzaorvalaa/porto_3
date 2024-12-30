import { TALK_TO_US_CLOSE, TALK_TO_US_OPEN } from '../../constants/TalkToUsAction'
import { initialTalkToUsState } from '../../constants/TalkToUsState'
import { ITalkToUsAction } from '../../interfaces/IReduxAction'
import { ITalkToUsState } from '../../interfaces/ITalkToUs'

export const TalkToUsReducer = (
  state: ITalkToUsState = initialTalkToUsState,
  action: ITalkToUsAction,
): ITalkToUsState => {
  switch (action.type) {
    case TALK_TO_US_OPEN:
      return talkToUsOpen(state)

    case TALK_TO_US_CLOSE:
      return talkToUsClose(state)

    default:
      return state
  }
}

const talkToUsOpen = (state: ITalkToUsState): ITalkToUsState => {
  return {
    ...state,
    open: true,
  }
}

const talkToUsClose = (state: ITalkToUsState): ITalkToUsState => {
  return {
    ...state,
    open: false,
  }
}
