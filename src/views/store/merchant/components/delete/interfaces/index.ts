import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IMerchant } from '../../../interfaces'
import { IMerchantFormData } from '../../form/interfaces'

export declare interface IMerchantDeleteProps extends IDialogDeleteProps {
  defaultValue?: IMerchant | null
  onConfirm?: (values?: IMerchantFormData) => void
}
