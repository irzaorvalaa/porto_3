import { Box, Button, Dialog, Divider, SelectChangeEvent, Stack, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React from 'react'
import './PaymentMethod.scss'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { FORMAT_DATE_INPUT } from '../../../../../../../constants/Parameter'
import { Link } from 'react-router-dom'

type Props = {
  openPayment: any
  handleClosePayment: any
}
const PaymentMethod = ({ openPayment, handleClosePayment }: Props) => {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  const [openPaymentMethod, setOpenPaymentMethod] = React.useState(true)

  const [openBank, setOpenBank] = React.useState(false)
  const handleOpenBank = () => {
    setOpenBank(true)
    setOpenPaymentMethod(false)
  }
  const handleCloseBank = () => {
    setOpenBank(false)
    setOpenPaymentMethod(true)
  }

  const [openCreditCard, setOpenCreditCard] = React.useState(false)
  const handleOpenCreditCard = () => {
    setOpenCreditCard(true)
    setOpenBank(false)
    setOpenPaymentMethod(false)
  }
  const handleCloseCreditCard = () => {
    setOpenCreditCard(false)
    setOpenBank(false)
    setOpenPaymentMethod(true)
  }

  return (
    <Dialog open={openPayment} onClose={handleClosePayment} fullWidth>
      <div className="dialog">
        {openPaymentMethod ? (
          <div>
            <div className="dialog__header">
              <div className="dialog__header--1">
                <h1>Payment Method</h1>
                <button onClick={handleClosePayment}>
                  <CloseIcon />
                </button>
              </div>
              <h1 className="dialog__header--2">Choose Payment</h1>
            </div>
            <Divider />
            <div className="dialog__card">
              <div className="dialog__card--payment-method">
                <div className="dialog__card--payment-method__btn">
                  <div>
                    <Button onClick={handleOpenBank}>BCA VIRTUAL ACCOUNT</Button>
                  </div>
                  <div>
                    <Button onClick={handleOpenCreditCard}>Credit Card</Button>
                  </div>
                </div>
                <div className="dialog__card--payment-method__txt">
                  <h1>Remarks:</h1>
                  <h1 className="my-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias dicta
                    consequatur harum cum expedita alias officia officiis adipisci repudiandae
                    architecto quam et enim id nisi veritatis nulla, iusto nobis sit.
                  </h1>
                  <h1 className="text-red-600">*Please complete your paymentwithin 1x24 hour.</h1>
                </div>
              </div>
              <Divider className="my-5" />
              <div className="dialog__card--footer">
                <h1>Total Payment</h1>
                <div className="dialog__card--footer__price">
                  <h1 className="text-xs">Rp</h1>
                  <h1 className="text-lg">240000</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {openBank ? (
          <div>
            <div className="dialog__header">
              <div className="dialog__header--1">
                <h1>Payment Method</h1>
                <button onClick={handleClosePayment}>
                  <CloseIcon />
                </button>
              </div>
              <div>
                <Stack direction="row" gap={2}>
                  <button onClick={handleCloseBank}>
                    <ArrowBackIcon />
                  </button>
                  <h1 className="dialog__header--2">BCA VA</h1>
                </Stack>
              </div>
            </div>
            <Divider />
            <div className="dialog__card">
              <div className="dialog__card--bank">
                <div className="dialog__card--bank__text">
                  <div className="mb-5">
                    <h1>Please Transfer To</h1>
                    <h1>LOGO</h1>
                  </div>
                  <h1 className="mb-2">Virtual Account Number</h1>
                  <div className="grid grid-flow-col justify-between">
                    <h1 className="text-gray-600 font-bold">7803 8902 7232 8832</h1>
                    <Button>copy</Button>
                  </div>
                </div>
                <Divider className="my-5" />
                <div>
                  <Link to="/payment">
                    <Button className="dialog__card--credit__btn" fullWidth>
                      BUY
                    </Button>
                  </Link>
                </div>
              </div>
              <Divider className="my-5" />
              <div className="dialog__card--footer">
                <h1>Total Payment</h1>
                <div className="dialog__card--footer__price">
                  <h1 className="text-xs">Rp</h1>
                  <h1 className="text-lg">240000</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {openCreditCard ? (
          <div>
            <div className="dialog__header">
              <div className="dialog__header--1">
                <h1>Payment Method</h1>
                <button onClick={handleClosePayment}>
                  <CloseIcon />
                </button>
              </div>
              <div>
                <Stack direction="row" gap={2}>
                  <button onClick={handleCloseCreditCard}>
                    <ArrowBackIcon />
                  </button>
                  <h1 className="dialog__header--2">Credit Card</h1>
                </Stack>
              </div>
            </div>
            <Divider />
            <div className="dialog__card">
              <div className="dialog__card--credit">
                <div className="dialog__card--credit__1">
                  <div className="grid grid-flow-col justify-between">
                    <h1>Card Number</h1>
                    <h1>LOGO</h1>
                  </div>
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
                </div>
                <div className="dialog__card--credit__2">
                  <div>
                    <h1>Expired Date</h1>
                    <TextField id="outlined-basic" label="mm/yy" variant="outlined" />
                  </div>
                  <div>
                    <h1>CVV</h1>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                  </div>
                </div>
                <div>
                  <Link to="/payment">
                    <Button className="dialog__card--credit__btn" fullWidth>
                      BUY
                    </Button>
                  </Link>
                </div>
              </div>
              <Divider className="my-5" />
              <div className="dialog__card--footer">
                <h1>Total Payment</h1>
                <div className="dialog__card--footer__price">
                  <h1 className="text-xs">Rp</h1>
                  <h1 className="text-lg">240000</h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Dialog>
  )
}

export default PaymentMethod
