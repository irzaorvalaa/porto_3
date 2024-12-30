import * as React from 'react'
import { IAnnouncementFormData } from '../form/interfaces'
import { IAnnouncementDeleteProps } from './interfaces'

// Components
import DialogDelete from '../../../../../components/dialog_delete'

const AnnouncementDelete = ({
  open = false,
  defaultValue = null,
  onConfirm,
  onClose,
  ...other
}: IAnnouncementDeleteProps) => {
  // State
  const [values, setValues] = React.useState<null | IAnnouncementFormData>(null)

  const onEnter = () => {
    const newValues: IAnnouncementFormData = {
      action: 'Delete',
      id: defaultValue?.id,
    }

    setValues(newValues)
  }

  const onDelete = () => onConfirm?.(values as IAnnouncementFormData)

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

export default AnnouncementDelete
