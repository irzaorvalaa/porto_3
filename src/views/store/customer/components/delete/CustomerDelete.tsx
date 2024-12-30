import * as React from 'react'
import { ICustomerFormData } from '../form/interfaces'
import { ICustomerDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const CustomerDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: ICustomerDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | ICustomerFormData>(null)

  const onEnter = () => {
    const newValues: ICustomerFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as ICustomerFormData)

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

export default CustomerDelete
