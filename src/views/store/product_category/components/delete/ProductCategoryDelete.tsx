import * as React from 'react'
import { IProductCategoryFormData } from '../form/interfaces'
import { IProductCategoryDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const ProductCategoryDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IProductCategoryDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IProductCategoryFormData>(null)

  const onEnter = () => {
    const newValues: IProductCategoryFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IProductCategoryFormData)

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

export default ProductCategoryDelete
