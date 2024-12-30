import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Tooltip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { LoadingButton } from '@mui/lab';
import { IDialogFormProps } from './interfaces';
import './DialogForm.scss';

// Icons
import { ReactComponent as CloseIcon } from '../../assets/svg/icons/close.svg';
import clsx from 'clsx';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogForm = ({
  open = false,
  type = "add",
  size = "lg",
  loading = false,
  title,
  labelCancelButton = "Cancel",
  labelConfirmButton = "Save",
  showCancelButton = true,
  showConfirmButton = true,
  children,
  onCancel,
  onConfirm,
  onClose,
  ...other
}: IDialogFormProps) => {
  const handleClose = (reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }

    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => handleClose(reason)}
      TransitionComponent={Transition}
      maxWidth={size}
      fullWidth
      disableEscapeKeyDown
      {...other}
    >
      <DialogTitle className="dialog-form__title">
        <div>{title}</div>

        {onClose && (
          <Tooltip title="Close">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <Divider />
      <DialogActions className="dialog-form__actions">
        {showCancelButton && (
          <Button
            variant="text"
            className="button button__text--passive"
            disabled={loading}
            onClick={onCancel}
          >
            {labelCancelButton}
          </Button>
        )}

        {showConfirmButton && (
          <LoadingButton
            variant="contained"
            className={clsx(
              "button",
              type === "delete" ? "button--delete" : "button--secondary"
            )}
            disableElevation
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
          >
            {labelConfirmButton}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
