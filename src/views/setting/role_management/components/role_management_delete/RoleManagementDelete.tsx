import * as React from 'react'
import { IRoleManagementFormData } from '../role_management_form/interfaces'
import { IRoleManagementDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const RoleManagementDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IRoleManagementDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IRoleManagementFormData>(null)

  const onEnter = () => {
    const newValues: IRoleManagementFormData = {
      action: 'Delete',
      id: defaultValue?.id,
      name: defaultValue?.name,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IRoleManagementFormData)

  return (
    <DialogDelete
      open={open}
      size="xs"
      label={defaultValue?.name}
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

export default RoleManagementDelete
