import { IBanner, IBannerDetailState, IBannerFormState, IBannerState } from '../interfaces'

export const initialStateBanner: IBannerState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateBannerDetail: IBannerDetailState = {
  isLoading: false,
  data: [],
  error: '',
}

export const initialStateBannerForm: IBannerFormState = {
  isLoading: false,
  data: null,
  error: '',
}
