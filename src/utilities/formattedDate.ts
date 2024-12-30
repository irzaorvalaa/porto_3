import moment from 'moment'
import { FORMAT_DATE_TEXT } from '../constants/Parameter'

const formattedDate = (str: string, format: string = FORMAT_DATE_TEXT): string => {
  return moment(str).format(format)
}

export default formattedDate
