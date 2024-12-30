import * as React from 'react'
import { IProductVariantFormData } from '../form/interfaces'
import { IProductVariantDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const ProductVariantDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IProductVariantDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IProductVariantFormData>(null)

  const onEnter = () => {
    const newValues: IProductVariantFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IProductVariantFormData)

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

export default ProductVariantDelete
