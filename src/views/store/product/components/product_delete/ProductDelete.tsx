import * as React from 'react'
import { IProductFormData } from '../product_form/interfaces'
import { IProductDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const ProductDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IProductDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IProductFormData>(null)

  const onEnter = () => {
    const newValues: IProductFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IProductFormData)

  return (
    <DialogDelete
      open={open}
      title="Delete Master Collection"
      size="xs"
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

export default ProductDelete
