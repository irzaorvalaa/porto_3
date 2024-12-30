import * as React from 'react'
import { ICalendarFormData } from '../form/interfaces'
import { ICalendarDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const CalendarDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: ICalendarDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | ICalendarFormData>(null)

  const onEnter = () => {
    const newValues: ICalendarFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as ICalendarFormData)

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

export default CalendarDelete
