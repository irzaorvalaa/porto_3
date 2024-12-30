import * as React from 'react'
import { IReferenceClinicFormData } from '../reference_clinic_form/interfaces'
import { IReferenceClinicDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const ReferenceClinicDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IReferenceClinicDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IReferenceClinicFormData>(null)

  const onEnter = () => {
    const newValues: IReferenceClinicFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IReferenceClinicFormData)

  return (
    <DialogDelete
      open={open}
      title="Delete Reference Clinic"
      size="xs"
      label={defaultValue?.requestorName as string}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={onDelete}
      TransitionProps={{
        onEnter: onEnter,
      }}
      {...other}
    />
  )
}

export default ReferenceClinicDelete
