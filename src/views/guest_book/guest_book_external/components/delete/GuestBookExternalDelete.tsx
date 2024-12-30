import * as React from 'react'
import { IGuestBookExternalFormData } from '../form/interfaces'
import { IGuestBookExternalDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const GuestBookExternalDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IGuestBookExternalDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IGuestBookExternalFormData>(null)

  const onEnter = () => {
    const newValues: IGuestBookExternalFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IGuestBookExternalFormData)

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

export default GuestBookExternalDelete
