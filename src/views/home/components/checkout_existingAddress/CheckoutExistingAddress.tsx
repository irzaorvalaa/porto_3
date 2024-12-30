import {
  Box,
  Typography,
  CardMedia,
  Button,
  Divider,
  CardContent,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Checkbox,
  Grid,
} from '@mui/material'

import Card from '@mui/material/Card'
import './CheckoutExistingAddress.scss'
import Container from '@mui/material/Container'
import React, { useState } from 'react'
import Address from './components/popup/address/Adress'
import PaymentMethod from './components/popup/payment_method/PaymentMethod'

const CheckoutExistingAddress = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [openPayment, setOpenPayment] = useState(false)
  const handleOpenPayment = () => {
    setOpenPayment(true)
  }
  const handleClosePayment = () => {
    setOpenPayment(false)
  }

  return (
    <div className="CheckoutExistingAddress">
      <Container className="CheckoutExistingAddress__containerPage">
        <Box
          className="CheckoutExistingAddress__cartTitle"
          sx={{
            width: 250,
            height: 50,
            color: 'white',
          }}
        >
          Checkout Address
        </Box>
        <Container className="CheckoutExistingAddress__container2">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <FormControl>
                  <RadioGroup
                    className="CheckoutExistingAddress__radioBtn"
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Delivery to Home" />
                    <FormControlLabel value="male" control={<Radio />} label="Pick up at Binus" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Grid container spacing={0}>
                <Grid item xs={3} md={4}>
                  <Typography className="CheckoutExistingAddress__DeliveryAddress">
                    Delivery Address
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1.5} className="CheckoutExistingAddress__Primary">
                  <Box component="div" sx={{ display: 'inline' }}>
                    <b>Primary</b>
                  </Box>
                </Grid>
              </Grid>
              <Typography className="m-3 mt-1 text-md font-bold">
                <b>Home</b>
              </Typography>
              <Typography className="m-3 mt-2 text-md font-bold">
                <b>Anonymous Person</b>
              </Typography>
              <Typography className="m-3 mt-2 text-md">081292932939</Typography>
              <Typography className="m-3 mt-2 text-md text-gray-400 w-3/4">
                Jl. Cikoneng, BCD (Bumi Cikoneng Damai) Residence, Blok A No.3 RT 02 RW 13,
                Lengkong, Bojongsoang, Bandung, Jawa Barat 40288
              </Typography>
              <Box>
                <button
                  onClick={handleOpen}
                  className="CheckoutExistingAddress__checkOut m-3 p-4 bg-transparant hover:bg-blue-100 text-blue-700 font-semibold py-2 border border-blue-800 rounded"
                >
                  Choose Address
                </button>
              </Box>
              <Typography className="m-3 mt-2 CheckoutExistingAddress__DeliveryAddress">
                Delivery Method
              </Typography>
              <FormControl>
                <RadioGroup
                  className="m-3"
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="SiCepat"
                    control={<Radio />}
                    label="Sicepat (01 Oct - 31 Oct)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={2} md={6}>
              <Typography className="CheckoutExistingAddress__AddressFormTitle2">
                Order List
              </Typography>
              <Card
                sx={{
                  display: 'flex',
                  width: 728,
                  height: 172,
                  boxShadow: 4,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 130, marginLeft: 1 }}
                  image="assets/img/3.jpeg"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Textbox
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography component="div" variant="h6">
                          BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      <s>Rp160.000</s>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={2} md={3}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={5}>
                        <Typography
                          className="CheckoutExistingAddress__quantityBox"
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          <p>x1</p>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>

              <Card
                sx={{
                  display: 'flex',
                  width: 728,
                  height: 172,
                  boxShadow: 4,
                  marginTop: 4,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 130, marginLeft: 1 }}
                  image="assets/img/2.jpeg"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Textbox
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography component="div" variant="h6">
                          BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      <s>Rp160.000</s>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={2} md={3}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={5}>
                        <Typography
                          className="CheckoutExistingAddress__quantityBox"
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          <p>x1</p>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
              <Card
                sx={{
                  display: 'flex',
                  width: 728,
                  height: 172,
                  boxShadow: 4,
                  marginTop: 4,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 130, marginLeft: 1 }}
                  image="assets/img/4.jpeg"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Textbox
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography component="div" variant="h6">
                          BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      <s>Rp160.000</s>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={2} md={3}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={5}>
                        <Typography
                          className="CheckoutExistingAddress__quantityBox"
                          variant="subtitle2"
                          color="text.secondary"
                        >
                          <p>x1</p>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
              <Box className="my-16">
                <Grid item xs={2} md={8}>
                  <Typography className="CheckoutExistingAddress__AddressFormTitle2">
                    Payment Summary
                  </Typography>
                  <Card
                    sx={{
                      width: 728,
                      boxShadow: 4,
                    }}
                  >
                    <Box sx={{ display: 'flex', flex: 'wrap', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }} className="m-4">
                        <Grid container>
                          <Grid item xs={6} md={6} className="text-left">
                            <Typography variant="subtitle1" color="text.secondary">
                              Subtotal (3 items)
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={6} className="text-right">
                            <Typography variant="subtitle1" color="text.secondary">
                              Rp250.000
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={6} md={6} className="text-left">
                            <Typography variant="subtitle1" color="text.secondary">
                              Delivery fee
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={6} className="text-right">
                            <Typography variant="subtitle1" color="text.secondary">
                              -Rp10.000
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={6} md={6} className="text-left">
                            <Typography variant="subtitle1" color="text.secondary">
                              Promo/Discount
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={6} className="text-right">
                            <Typography variant="subtitle1" color="text.secondary">
                              -Rp10.000
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} />
                        <Grid container>
                          <Grid item xs={6} md={6} className="text-left">
                            <Typography component="div" variant="subtitle1" color="color">
                              <b>Total</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={6} className="text-right">
                            <Typography
                              className="CheckoutExistingAddress__quantityBox"
                              variant="subtitle1"
                              color="color"
                            >
                              <b>Rp230.000</b>
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </Card>

                  <Box>
                    <button
                      onClick={handleOpenPayment}
                      className="CheckoutExistingAddress__checkOut mt-6 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 border border-blue-400 rounded w-1/2"
                    >
                      Payment
                    </button>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <PaymentMethod openPayment={openPayment} handleClosePayment={handleClosePayment} />
      <Address open={open} handleClose={handleClose} />
    </div>
  )
}

export default CheckoutExistingAddress
