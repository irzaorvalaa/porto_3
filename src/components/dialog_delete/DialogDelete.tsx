import * as React from 'react'
import { Typography } from '@mui/material'
import { IDialogDeleteProps } from './interfaces'

// Components
import DialogForm from '../dialog_form'

const DialogDelete = ({
  open = false,
  type = 'delete',
  label = 'Label',
  onConfirm,
  onClose,
  ...other
}: IDialogDeleteProps) => {
  return (
    <DialogForm
      open={open}
      title="Delete"
      size="xs"
      labelConfirmButton="Yes, Delete"
      type={type}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      {...other}
    >
      <div>
        <Typography variant="body2">
          This action cannot be undone. This will permanently delete the <b>{label}</b>. Continue?
        </Typography>
      </div>
    </DialogForm>
  )
}

export default DialogDelete
