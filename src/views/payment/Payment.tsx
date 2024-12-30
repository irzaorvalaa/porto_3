import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import './Payment.scss'
import { Link } from 'react-router-dom'

const Payment = () => {
  return (
    <div className="payment">
      <Box
        className="payment__title"
        sx={{
          width: 250,
          height: 50,
          color: 'white',
        }}
      >
        Payment
      </Box>
      <div className="payment__container">
        <div className="payment__container--header">
          <h1 className="payment__container--header__1">Complete Payment within</h1>
          <h1 className="payment__container--header__2">23:35:05</h1>
          <h1 className="payment__container--header__3">Payment deadline</h1>
          <h1 className="payment__container--header__4">Tuesday, 2 October 2022, 14:03</h1>
        </div>
        <div className="payment__container--card">
          <div className="payment__container--card__header">
            <h1>BCA Virtual Account</h1>
            <h1>LOGO</h1>
          </div>
          <Divider />
          <div className="payment__container--card__detail">
            <div className="payment__container--card__detail--1">
              <div>
                <h1 className="payment__container--card__detail--1__name">
                  Virtual Account Number
                </h1>
                <h1 className="payment__container--card__detail--1__value">62513712839123</h1>
              </div>
              <h1>Copy</h1>
            </div>
            <div className="payment__container--card__detail--1">
              <div>
                <h1 className="payment__container--card__detail--1__name">Payment Total</h1>
                <Stack direction="row">
                  <h1>Rp</h1>
                  <h1 className="payment__container--card__detail--1__value">240000</h1>
                </Stack>
              </div>
              <h1>view detail</h1>
            </div>
            <div className="payment__container--card__detail--1">
              <div>
                <h1 className="payment__container--card__detail--1__name">Order Number</h1>
                <h1 className="payment__container--card__detail--1__value">SP2839123</h1>
              </div>
              <h1>Copy</h1>
            </div>
          </div>
        </div>
        <div>
          <Link to="/">
            <Button className="payment__container--btn">Continue Shopping</Button>
          </Link>
        </div>
        <div className="payment__container--method">
          <h1>Payment Method</h1>
          <Divider />
          <div className="my-5">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: 'blue',
                  color: 'white',
                }}
              >
                <Typography className="font-bold">ATM BCA</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
