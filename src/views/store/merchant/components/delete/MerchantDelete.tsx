import * as React from 'react'
import { IMerchantFormData } from '../form/interfaces'
import { IMerchantDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const MerchantDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IMerchantDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IMerchantFormData>(null)

  const onEnter = () => {
    const newValues: IMerchantFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IMerchantFormData)

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

export default MerchantDelete
