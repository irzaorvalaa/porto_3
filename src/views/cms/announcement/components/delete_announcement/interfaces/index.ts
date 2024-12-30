import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IAnnouncement } from '../../../interfaces'
import { IAnnouncementFormData } from '../../form/interfaces'

export declare interface IAnnouncementDeleteProps extends IDialogDeleteProps {
  defaultValue?: IAnnouncement | null
  onConfirm?: (values?: IAnnouncementFormData) => void
}
