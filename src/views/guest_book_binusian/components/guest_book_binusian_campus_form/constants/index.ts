import * as yup from 'yup'
import { IGuestBookBinusianCampusFormData } from '../interfaces'

export const guestBookBinusianCampusSchema = yup.object({
  campus: yup.string().required().label('Campus'),
})

export const initialGuestBookBinusianCampusFormdata: IGuestBookBinusianCampusFormData = {
  campus: '',
}
