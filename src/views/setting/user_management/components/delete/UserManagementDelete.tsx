import * as React from 'react'
import { IUserManagementFormData } from '../form/interfaces'
import { IUserManagementDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const UserManagementDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IUserManagementDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IUserManagementFormData>(null)

  const onEnter = () => {
    const newValues: IUserManagementFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IUserManagementFormData)

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

export default UserManagementDelete
