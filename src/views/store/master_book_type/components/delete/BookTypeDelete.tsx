import * as React from 'react'
import { IBookTypeFormData } from '../form/interfaces'
import { IBookTypeDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const BookTypeDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IBookTypeDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IBookTypeFormData>(null)

  const onEnter = () => {
    const newValues: IBookTypeFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IBookTypeFormData)

  return (
    <DialogDelete
      open={open}
      label={defaultValue?.label as string}
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

export default BookTypeDelete
