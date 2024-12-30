import * as React from 'react'
import { INewsFormData } from '../form/interfaces'
import { INewsDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const NewsDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: INewsDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | INewsFormData>(null)

  const onEnter = () => {
    const newValues: INewsFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as INewsFormData)

  return (
    <DialogDelete
      open={open}
      label={defaultValue?.title as string}
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

export default NewsDelete
