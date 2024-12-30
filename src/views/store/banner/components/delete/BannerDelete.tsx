import * as React from 'react'
import { IBannerFormData } from '../form/interfaces'
import { IBannerDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const BannerDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IBannerDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IBannerFormData>(null)

  const onEnter = () => {
    const newValues: IBannerFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IBannerFormData)

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

export default BannerDelete
