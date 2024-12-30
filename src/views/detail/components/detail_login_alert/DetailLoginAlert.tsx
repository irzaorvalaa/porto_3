import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { IDetailLoginAlertProps } from './interfaces'

const DetailLoginAlert = ({ open, onConfirm, onClose }: IDetailLoginAlertProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Please login to continue</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Login</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DetailLoginAlert
