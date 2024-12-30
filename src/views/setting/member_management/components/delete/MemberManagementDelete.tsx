import * as React from 'react'
import { IMemberManagementFormData } from '../form/interfaces'
import { IMemberManagementDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const MemberManagementDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IMemberManagementDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IMemberManagementFormData>(null)

  const onEnter = () => {
    const newValues: IMemberManagementFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IMemberManagementFormData)

  return (
    <DialogDelete
      open={open}
      label={defaultValue?.name as string}
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

export default MemberManagementDelete
