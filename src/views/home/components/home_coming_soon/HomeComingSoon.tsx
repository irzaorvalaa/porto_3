import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { IHomeComingSoonProps } from './interfaces'

const HomeComingSoon = ({ open, onClose }: IHomeComingSoonProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This feature is coming soon.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default HomeComingSoon
