import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IAnnouncement, IAnnouncementDetail } from '../../../interfaces'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'

export interface IAnnouncementFormProps extends IDialogFormProps {
  campusOptions?: IGeneralFetch[]
  defaultValue?: IAnnouncementDetail | null
  onConfirm?: (values: IAnnouncementFormData) => void
}

export interface IAnnouncementFormData extends IFormDataDefault {
  title?: string
  fileName?: string
  fileData?: string
  effDateStart?: string
  effDateEnd?: string
  selAllCampus?: string
  campusID?: string[]
  campusName?: string[]
  description?: string
}
