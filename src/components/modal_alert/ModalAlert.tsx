import React from 'react'
import clsx from 'clsx'
import { IModalAlertProps } from './interfaces'
import './ModalAlert.scss'
import { Button } from '@mui/material'

const ModalAlert = ({
  message,
  type,
  onCancel,
  onConfirm,
  showCancelButton = false,
  showConfirmButton = true,
  labelCancelButton = 'Cancel',
  labelConfirmButton = 'Confirm',
}: IModalAlertProps) => {
  const alertType: any = {
    warning: {
      className: 'modal-alert__icon--warning',
      content: '!',
    },
    error: {
      className: 'modal-alert__icon--error',
      content: '✕',
    },
    question: {
      className: 'modal-alert__icon--question',
      content: '?',
    },
    success: {
      className: 'modal-alert__icon--success',
      content: '✓',
    },
  }

  return (
    <React.Fragment>
      <div className="modal-alert__container">
        <div className="modal-alert__wrapper">
          <div className="modal-alert__type">
            <div className={clsx('modal-alert__icon', alertType[type].className)}>
              <div className="modal-alert__icon--content">{alertType[type].content}</div>
            </div>
          </div>
          <div className="modal-alert__message">{message}</div>
          <div className="modal-alert__action">
            {showCancelButton && (
              <Button variant="outlined" className="button__outlined" onClick={onCancel}>
                {labelCancelButton}
              </Button>
            )}

            {showConfirmButton && (
              <Button
                variant="contained"
                disableElevation
                className="button--primary"
                onClick={onConfirm}
              >
                {labelConfirmButton}
              </Button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalAlert
