import * as React from 'react'
import { IMappingProductFormData } from '../form/interfaces'
import { IMappingProductDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const MappingProductDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IMappingProductDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IMappingProductFormData>(null)

  const onEnter = () => {
    const newValues: IMappingProductFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IMappingProductFormData)

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

export default MappingProductDelete
