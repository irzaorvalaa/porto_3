import { IDialogDeleteProps } from '../../../../../../components/dialog_delete/interfaces'
import { IReferenceClinic } from '../../../interfaces'
import { IReferenceClinicFormData } from '../../reference_clinic_form/interfaces'

export declare interface IReferenceClinicDeleteProps extends IDialogDeleteProps {
  defaultValue?: IReferenceClinic | null
  onConfirm?: (values?: IReferenceClinicFormData) => void
}
