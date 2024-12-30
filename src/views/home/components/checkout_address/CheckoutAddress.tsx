import {
  Box,
  Typography,
  FormGroup,
  CardMedia,
  Checkbox,
  Divider,
  CardContent,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Grid,
} from '@mui/material'

import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import './CheckoutAddress.scss'
import { Link } from 'react-router-dom'

const CheckoutAddress = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Box className="CheckoutAddress__container">
            <Typography className="CheckoutAddress__pageTitle">Checkout Address</Typography>
          </Box>
          <div className="CheckoutAddress__flexCart">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Select All" />
            <Divider />
            <div className="CheckoutAddress__flexCheckbox">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Diego Syahib" />
              <h1 className="CheckoutAddress__pickAccount">Shop using this account </h1>
            </div>
            <div className="CheckoutAddress__flexCheckbox">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Diego Syahib" />
              <h1 className="CheckoutAddress__pickAccount">Shop using this account </h1>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
    // <div className="CheckoutAddress">
    //   <Container className="CheckoutAddress__Responsive">
    //     <Box
    //       className="CheckoutAddress__cartTitle"
    //       sx={{
    //         width: 250,
    //         height: 50,
    //         color: 'white',
    //       }}
    //     >
    //       Checkout Address
    //     </Box>
    //     <Container className="CheckoutAddress__Responsive2">
    //       <Grid container spacing={2}>
    //         <Grid item xs={6}>
    //           <Box>
    //             <FormControl>
    //               <RadioGroup
    //                 className="m-3"
    //                 row
    //                 aria-labelledby="demo-row-radio-buttons-group-label"
    //                 name="row-radio-buttons-group"
    //               >
    //                 <FormControlLabel value="female" control={<Radio />} label="Delivery to Home" />
    //                 <FormControlLabel value="male" control={<Radio />} label="Pick up at Binus" />
    //               </RadioGroup>
    //             </FormControl>
    //           </Box>
    //           <Typography className="m-3 mt-2 CheckoutAddress__AddressFormTitle">
    //             New Address Form
    //           </Typography>
    //           <Box className="">
    //             <TextField
    //               sx={{
    //                 width: { sm: 100 },
    //                 borderRadius: 0,
    //                 '& .MuiInputBase-root': {},
    //               }}
    //               className="CheckoutAddress__TextField m-3"
    //               id="outlined-basic"
    //               label="Title"
    //               variant="outlined"
    //             />
    //             <TextField
    //               // sx={{
    //               //   width: { sm: 120, md: 220, xl: 320 },
    //               //   '& .MuiInputBase-root': {},
    //               // }}
    //               className="m-3 CheckoutAddress__TextField"
    //               id="outlined-basic"
    //               label="Input recipient name..."
    //               variant="outlined"
    //             />
    //           </Box>
    //           <Box className="">
    //             <TextField
    //               className="m-3 CheckoutAddress__TextField2"
    //               id="outlined-basic"
    //               label="Input your contact number..."
    //               variant="outlined"
    //             />
    //           </Box>
    //           <Box className="">
    //             <TextField
    //               className="m-3 CheckoutAddress__TextField2"
    //               id="outlined-basic"
    //               label="Input your email address..."
    //               variant="outlined"
    //             />
    //           </Box>
    //           <Box className="">
    //             <TextField
    //               className="m-3 CheckoutAddress__TextField2"
    //               id="outlined-basic"
    //               label="Province"
    //               variant="outlined"
    //             />
    //           </Box>
    //           <Box className="">
    //             <TextField
    //               sx={{
    //                 width: { sm: 200 },
    //                 '& .MuiInputBase-root': {},
    //               }}
    //               className="m-3 CheckoutAddress__TextField"
    //               id="outlined-basic"
    //               label="City"
    //               variant="outlined"
    //             />
    //             <TextField
    //               className="m-3 CheckoutAddress__TextField"
    //               id="outlined-basic"
    //               label="Zip Code"
    //               variant="outlined"
    //             />
    //           </Box>
    //           <TextField
    //             sx={{
    //               // width: { sm: 200, md: 300, xl: 700 },
    //               '& .MuiInputBase-root': {
    //                 height: 150,
    //               },
    //             }}
    //             className="m-3 CheckoutAddress__textArea"
    //             id="outlined-basic"
    //             label="Input your address..."
    //             variant="outlined"
    //           />
    //           <Box>
    //             <button className="m-3 CheckoutAddress__saveAddress m-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700 rounded">
    //               Save
    //             </button>
    //           </Box>
    //         </Grid>
    //         <Grid item xs={5} md={6}>
    //           <Typography className="CheckoutAddress__AddressFormTitle2">Order List</Typography>
    //           <Card
    //             sx={{
    //               display: 'flex',
    //               width: '100%',
    //               height: 172,
    //               boxShadow: 4,
    //             }}
    //           >
    //             <CardMedia component="img" sx={{ width: '25%' }} image="assets/img/3.jpeg" />
    //             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //               <CardContent sx={{ flex: '1 0 auto' }}>
    //                 <Typography variant="subtitle1" color="text.secondary" component="div">
    //                   Textbox
    //                 </Typography>
    //                 <Grid container spacing={1}>
    //                   <Grid item xs={6} md={8}>
    //                     <Typography component="div" variant="h6">
    //                       BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //                 <Typography variant="subtitle2" color="text.secondary" component="div">
    //                   <s>Rp160.000</s>
    //                 </Typography>
    //                 <Grid container spacing={10}>
    //                   <Grid item xs={2} md={3}>
    //                     <Typography variant="h5" color="black" component="div">
    //                       <b>Rp320.000</b>
    //                     </Typography>
    //                   </Grid>
    //                   <Grid item xs={3} md={4}>
    //                     <Typography
    //                       className="CheckoutAddress__quantityBox"
    //                       variant="subtitle2"
    //                       color="text.secondary"
    //                     >
    //                       <p>x1</p>
    //                     </Typography>
    //                   </Grid>
    //                   <Grid item xs={1} md={2}>
    //                     <Typography variant="h5" color="black" component="div">
    //                       <b>Rp320.000</b>
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //               </CardContent>
    //             </Box>
    //           </Card>

    //           <Card
    //             sx={{
    //               display: 'flex',
    //               height: 172,
    //               boxShadow: 4,
    //               marginTop: 4,
    //             }}
    //           >
    //             <CardMedia component="img" sx={{ width: '25%' }} image="assets/img/2.jpeg" />
    //             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //               <CardContent sx={{ flex: '1 0 auto' }}>
    //                 <Typography variant="subtitle1" color="text.secondary" component="div">
    //                   Textbox
    //                 </Typography>
    //                 <Grid container spacing={1}>
    //                   <Grid item xs={6} md={8}>
    //                     <Typography component="div" variant="h6">
    //                       BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //                 <Typography variant="subtitle2" color="text.secondary" component="div">
    //                   <s>Rp160.000</s>
    //                 </Typography>
    //                 <Grid container spacing={10}>
    //                   <Grid item xs={2} md={3}>
    //                     <Typography variant="h5" color="black" component="div">
    //                       <b>Rp320.000</b>
    //                     </Typography>
    //                   </Grid>
    //                   <Grid item xs={3} md={4}>
    //                     <Typography
    //                       className="CheckoutAddress__quantityBox"
    //                       variant="subtitle2"
    //                       color="text.secondary"
    //                     >
    //                       <p>x1</p>
    //                     </Typography>
    //                   </Grid>
    //                   <Grid item xs={1} md={2}>
    //                     <Typography variant="h5" color="black" component="div">
    //                       <b>Rp320.000</b>
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //               </CardContent>
    //             </Box>
    //           </Card>
    //           <Card
    //             sx={{
    //               display: 'flex',
    //               height: 172,
    //               boxShadow: 4,
    //               marginTop: 4,
    //             }}
    //           >
    //             <CardMedia component="img" sx={{ width: '25%' }} image="assets/img/4.jpeg" />
    //             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //               <CardContent sx={{ flex: '1 0 auto' }}>
    //                 <Typography variant="subtitle1" color="text.secondary" component="div">
    //                   Textbox
    //                 </Typography>
    //                 <Grid container spacing={1}>
    //                   <Grid item xs={6} md={8}>
    //                     <Typography component="div" variant="h6">
    //                       BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //                 <Typography variant="subtitle2" color="text.secondary" component="div">
    //                   <s>Rp160.000</s>
    //                 </Typography>
    //                 <Grid container spacing={10}>
    //                   <Grid item xs={2} md={3}>
    //                     <Typography variant="h5" color="black" component="div">
    //                       <b>Rp320.000</b>
    //                     </Typography>
    //                   </Grid>
    //                   <Grid item xs={3} md={4}>
    //                     <Typography
    //                       className="CheckoutAddress__quantityBox"
    //                       variant="subtitle2"
    //                       color="text.secondary"
    //                     >
    //                       <p>x1</p>
    //                     </Typography>
    //                   </Grid>
    //                   <Grid item xs={1} md={2}>
    //                     <Typography variant="h5" color="black" component="div">
    //                       <b>Rp320.000</b>
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //               </CardContent>
    //             </Box>
    //           </Card>
    //           <Box className="my-16">
    //             <Grid item xs={2} md={8}>
    //               <Typography className="CheckoutAddress__AddressFormTitle2">
    //                 Payment Summary
    //               </Typography>
    //               <Card
    //                 sx={{
    //                   width: '150%',
    //                   boxShadow: 4,
    //                 }}
    //               >
    //                 <Box sx={{ display: 'flex', flex: 'wrap', flexDirection: 'column' }}>
    //                   <CardContent sx={{ flex: '1 0 auto' }} className="m-4">
    //                     <Grid container>
    //                       <Grid item xs={6} md={6} className="text-left">
    //                         <Typography variant="subtitle1" color="text.secondary">
    //                           Subtotal (3 items)
    //                         </Typography>
    //                       </Grid>
    //                       <Grid item xs={6} md={6} className="text-right">
    //                         <Typography variant="subtitle1" color="text.secondary">
    //                           Rp250.000
    //                         </Typography>
    //                       </Grid>
    //                     </Grid>
    //                     <Grid container>
    //                       <Grid item xs={6} md={6} className="text-left">
    //                         <Typography variant="subtitle1" color="text.secondary">
    //                           Delivery fee
    //                         </Typography>
    //                       </Grid>
    //                       <Grid item xs={6} md={6} className="text-right">
    //                         <Typography variant="subtitle1" color="text.secondary">
    //                           -Rp10.000
    //                         </Typography>
    //                       </Grid>
    //                     </Grid>
    //                     <Grid container>
    //                       <Grid item xs={6} md={6} className="text-left">
    //                         <Typography variant="subtitle1" color="text.secondary">
    //                           Promo/Discount
    //                         </Typography>
    //                       </Grid>
    //                       <Grid item xs={6} md={6} className="text-right">
    //                         <Typography variant="subtitle1" color="text.secondary">
    //                           -Rp10.000
    //                         </Typography>
    //                       </Grid>
    //                     </Grid>
    //                     <Divider sx={{ width: '100%', marginTop: 2, marginBottom: 2 }} />
    //                     <Grid container>
    //                       <Grid item xs={6} md={6} className="text-left">
    //                         <Typography component="div" variant="subtitle1" color="color">
    //                           <b>Total</b>
    //                         </Typography>
    //                       </Grid>
    //                       <Grid item xs={6} md={6} className="text-right">
    //                         <Typography
    //                           className="CheckoutAddress__quantityBox"
    //                           variant="subtitle1"
    //                           color="color"
    //                         >
    //                           <b>Rp230.000</b>
    //                         </Typography>
    //                       </Grid>
    //                     </Grid>
    //                   </CardContent>
    //                 </Box>
    //               </Card>
    //               <Link to="/checkout-existing-address">
    //                 <Box>
    //                   <button className="CheckoutAddress__checkOut mt-6 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 border border-blue-400 rounded">
    //                     Payment
    //                   </button>
    //                 </Box>
    //               </Link>
    //             </Grid>
    //           </Box>
    //         </Grid>
    //       </Grid>
    //     </Container>
    //   </Container>
    // </div>
  )
}

export default CheckoutAddress
