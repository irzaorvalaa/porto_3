import * as React from 'react'
import { ICampusFormData } from '../campus_form/interfaces'
import { ICampusDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const CampusDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: ICampusDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | ICampusFormData>(null)

  const onEnter = () => {
    const newValues: ICampusFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }
    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as ICampusFormData)

  return (
    <DialogDelete
      open={open}
      title="Delete Campus"
      size="xs"
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

export default CampusDelete
