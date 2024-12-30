import { IDialogFormProps } from '../../../../../components/dialog_form/interfaces'
import { IBECampus } from '../../../../../interfaces/ICampus'
import { IGeneralFetch } from '../../../../../interfaces/IGeneralFetch'

export interface IGuestBookBinusianCampusFormProps extends IDialogFormProps {
  campusOptions?: IBECampus[]
  defaultValue?: IBECampus | null
  onConfirm?: (values: IBECampus) => void
}

export interface IGuestBookBinusianCampusFormData {
  campus?: string
}
