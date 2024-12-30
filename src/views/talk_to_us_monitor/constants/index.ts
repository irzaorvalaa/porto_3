import { ITalkToUsState, ITalkToUsFormState } from '../interfaces'
  
  const initialStateTalkToUs: ITalkToUsState = {
    isLoading: false,
    data: [],
    error: '',
  }

  const initialStateTalkToUsConfirm: ITalkToUsFormState = {
    isLoading: false,
    data: null,
    error: '',
  }
  
  export {
    initialStateTalkToUs,
    initialStateTalkToUsConfirm
  }
  