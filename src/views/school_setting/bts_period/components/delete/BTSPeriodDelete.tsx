import * as React from 'react'
import { IBTSPeriodFormData } from '../form/interfaces'
import { IBTSPeriodDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const BTSPeriodDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IBTSPeriodDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IBTSPeriodFormData>(null)

  const onEnter = () => {
    const newValues: IBTSPeriodFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IBTSPeriodFormData)

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

export default BTSPeriodDelete
