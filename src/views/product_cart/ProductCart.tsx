import {
  Box,
  Typography,
  CardMedia,
  Button,
  Divider,
  CardContent,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material'

import Card from '@mui/material/Card'
import './ProductCart.scss'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCart = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="ProductCart__container">
        <Typography className="ProductCart__pageTitle">Cart</Typography>
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#FFFFFF', height: 'auto', marginTop: 4, marginBottom: 4 }}>
          <div className="ProductCart__flexCart">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Select All" />
            <Divider />
            <div className="ProductCart__flexCheckbox">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Diego Syahib" />
              <Typography className="ProductCart__pickAccount">Shop using this account </Typography>
            </div>
            <div className="ProductCart__flexCheckbox2">
              <FormControlLabel control={<Checkbox defaultChecked />} label="" />
              <Card
                sx={{
                  display: 'flex',
                  flex: 'nowrap',
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <CardMedia component="img" sx={{ width: '22%' }} image="assets/img/2.jpeg" />
                <Box sx={{ display: 'flex', flex: 'nowrap' }}>
                  <CardContent sx={{ flex: 'nowrap', flexDirection: 'row' }}>
                    <div className="ProductCart__productName">
                      <Typography>Textbox</Typography>
                      <Typography className="ProductCart__productName2">
                        <b>BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1</b>
                      </Typography>
                      <Typography>
                        <s>Rp160.000</s>
                      </Typography>
                      <Typography variant="h5" color="black" component="div">
                        <b>Rp320.000</b>
                      </Typography>
                    </div>
                    {/* <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Textbox
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Typography
                          className="product-cart__Delete"
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <p>Delete</p>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography component="div" variant="subtitle1">
                          BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      <s>Rp160.000</s>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6} md={8}>
                        <Typography variant="h5" color="black" component="div">
                          <b>Rp320.000</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Typography
                          className="product-cart__quantityBox"
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          <p>Quantity: 20</p>
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </CardContent>
                </Box>
              </Card>
            </div>
          </div>
          <div className="ProductCart__flexCart">
            <Divider className="mt-4" />
            <div className="ProductCart__flexCheckbox">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Clarisa Syuhada" />
              <Typography className="ProductCart__pickAccount">Shop using this account </Typography>
            </div>
            <div className="ProductCart__flexCheckbox2">
              <FormControlLabel control={<Checkbox defaultChecked />} label="" />
              <Card
                sx={{
                  display: 'flex',
                  flex: 'nowrap',
                  width: '100%',
                  boxShadow: 2,
                }}
              >
                <CardMedia component="img" sx={{ width: '22%' }} image="assets/img/2.jpeg" />
                <Box sx={{ display: 'flex', flex: 'nowrap' }}>
                  <CardContent sx={{ flex: 'nowrap', flexDirection: 'row' }}>
                    <div className="ProductCart__productName">
                      <Typography>Textbox</Typography>
                      <Typography className="ProductCart__productName2">
                        BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
                      </Typography>
                      <Typography>
                        <s>Rp160.000</s>
                      </Typography>
                      <Typography variant="h5" color="black" component="div">
                        <b>Rp320.000</b>
                      </Typography>
                    </div>
                  </CardContent>
                </Box>
              </Card>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>

    //   const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    //   const Img = styled('img')({
    //     margin: 'auto',
    //     display: 'block',
    //     maxWidth: '100%',
    //     maxHeight: '100%',
    //   })
    //   return (
    //     <Box
    //       sx={{
    //         marginTop: 4,
    //         marginBottom: 140,
    //         width: 300,
    //         height: 60,
    //         backgroundColor: 'black',
    //       }}
    //       className="product-cart"
    //     >
    //       <p className="product-cart__title">Cart</p>
    //       <React.Fragment>
    //         <CssBaseline />
    //         <Container>
    //           <Box
    //             sx={{
    //               bgcolor: '#ffffff',
    //               height: '1000px',
    //               width: '520%',
    //               marginTop: 4,
    //               padding: 2,
    //             }}
    //           >
    //             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //               <Grid item xs={6}>
    //                 <FormControlLabel
    //                   control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
    //                   label="Select All"
    //                 />
    //                 <Divider />
    //                 <Grid container spacing={1}>
    //                   <Grid item xs={6} md={8}>
    //                     <Box className="my-2">
    //                       <FormControlLabel
    //                         control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
    //                         label="Diego Syahib"
    //                       />
    //                     </Box>
    //                   </Grid>
    //                   <Grid item xs={2} md={4}>
    //                     <Typography
    //                       className="my-4 product-cart__SelectAccount"
    //                       variant="subtitle2"
    //                       component="div"
    //                     >
    //                       Shop using this account
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //                 <Box className="my-4">
    //                   <Grid container spacing={0}>
    //                     <Grid item xs="auto">
    //                       <Box className="my-14 m-4">
    //                         <FormControlLabel
    //                           control={
    //                             <Checkbox
    //                               sx={{
    //                                 '& .MuiSvgIcon-root': { fontSize: 28 },
    //                               }}
    //                             />
    //                           }
    //                           label=""
    //                         />
    //                       </Box>
    //                     </Grid>
    //                     <Grid item xs={1} md={2}>
    //                       <Card
    //                         sx={{
    //                           display: 'flex',
    //                           width: '520%',
    //                           height: 172,
    //                           boxShadow: 4,
    //                         }}
    //                       >
    //                         <CardMedia
    //                           component="img"
    //                           sx={{ width: '20%' }}
    //                           image="assets/img/2.jpeg"
    //                         />
    //                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //                           <CardContent sx={{ flex: '1 0 auto' }}>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography
    //                                   variant="subtitle1"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   Textbox
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__Delete"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Delete</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography component="div" variant="subtitle1">
    //                                   BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>

    //                             <Typography variant="subtitle2" color="text.secondary" component="div">
    //                               <s>Rp160.000</s>
    //                             </Typography>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography variant="h5" color="black" component="div">
    //                                   <b>Rp320.000</b>
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__quantityBox"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Quantity: 20</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                           </CardContent>
    //                         </Box>
    //                       </Card>
    //                     </Grid>
    //                   </Grid>
    //                 </Box>
    //                 <Grid container spacing={1}>
    //                   <Grid item xs={6} md={8}>
    //                     <Box className="my-2">
    //                       <FormControlLabel
    //                         control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
    //                         label="Clarisa Syuhada"
    //                       />
    //                     </Box>
    //                   </Grid>
    //                   <Grid item xs={2} md={4}>
    //                     <Typography
    //                       className="my-4 product-cart__SelectAccount"
    //                       variant="subtitle2"
    //                       component="div"
    //                     >
    //                       Shop using this account
    //                     </Typography>
    //                   </Grid>
    //                 </Grid>
    //                 <Box className="my-6">
    //                   <Grid container spacing={0}>
    //                     <Grid item xs="auto">
    //                       <Box className="my-14 m-4">
    //                         <FormControlLabel
    //                           control={
    //                             <Checkbox
    //                               sx={{
    //                                 '& .MuiSvgIcon-root': { fontSize: 28 },
    //                               }}
    //                             />
    //                           }
    //                           label=""
    //                         />
    //                       </Box>
    //                     </Grid>
    //                     <Grid item xs={1} md={2}>
    //                       <Card
    //                         sx={{
    //                           display: 'flex',
    //                           width: '520%',
    //                           height: 172,
    //                           boxShadow: 4,
    //                         }}
    //                       >
    //                         <CardMedia
    //                           component="img"
    //                           sx={{ width: '20%' }}
    //                           image="assets/img/2.jpeg"
    //                         />
    //                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //                           <CardContent sx={{ flex: '1 0 auto' }}>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography
    //                                   variant="subtitle1"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   Textbox
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__Delete"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Delete</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography component="div" variant="subtitle1">
    //                                   BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>

    //                             <Typography variant="subtitle2" color="text.secondary" component="div">
    //                               <s>Rp160.000</s>
    //                             </Typography>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography variant="h5" color="black" component="div">
    //                                   <b>Rp320.000</b>
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__quantityBox"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Quantity: 20</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                           </CardContent>
    //                         </Box>
    //                       </Card>
    //                     </Grid>
    //                   </Grid>
    //                 </Box>
    //                 <Box className="my-6">
    //                   <Grid container spacing={0}>
    //                     <Grid item xs="auto">
    //                       <Box className="my-14 m-4">
    //                         <FormControlLabel
    //                           control={
    //                             <Checkbox
    //                               sx={{
    //                                 '& .MuiSvgIcon-root': { fontSize: 28 },
    //                               }}
    //                             />
    //                           }
    //                           label=""
    //                         />
    //                       </Box>
    //                     </Grid>
    //                     <Grid item xs={1} md={2}>
    //                       <Card
    //                         sx={{
    //                           display: 'flex',
    //                           width: '520%',
    //                           height: 172,
    //                           boxShadow: 4,
    //                         }}
    //                       >
    //                         <CardMedia
    //                           component="img"
    //                           sx={{ width: '20%' }}
    //                           image="assets/img/2.jpeg"
    //                         />
    //                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //                           <CardContent sx={{ flex: '1 0 auto' }}>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography
    //                                   variant="subtitle1"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   Textbox
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__Delete"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Delete</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography component="div" variant="subtitle1">
    //                                   BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>

    //                             <Typography variant="subtitle2" color="text.secondary" component="div">
    //                               <s>Rp160.000</s>
    //                             </Typography>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography variant="h5" color="black" component="div">
    //                                   <b>Rp320.000</b>
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__quantityBox"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Quantity: 20</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                           </CardContent>
    //                         </Box>
    //                       </Card>
    //                     </Grid>
    //                   </Grid>
    //                 </Box>
    //                 <Box className="my-6">
    //                   <Grid container spacing={0}>
    //                     <Grid item xs="auto">
    //                       <Box className="my-14 m-4">
    //                         <FormControlLabel
    //                           control={
    //                             <Checkbox
    //                               sx={{
    //                                 '& .MuiSvgIcon-root': { fontSize: 28 },
    //                               }}
    //                             />
    //                           }
    //                           label=""
    //                         />
    //                       </Box>
    //                     </Grid>
    //                     <Grid item xs={1} md={2}>
    //                       <Card
    //                         sx={{
    //                           display: 'flex',
    //                           width: '520%',
    //                           height: 172,
    //                           boxShadow: 4,
    //                         }}
    //                       >
    //                         <CardMedia
    //                           component="img"
    //                           sx={{ width: '20%' }}
    //                           image="assets/img/2.jpeg"
    //                         />
    //                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //                           <CardContent sx={{ flex: '1 0 auto' }}>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography
    //                                   variant="subtitle1"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   Textbox
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__Delete"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Delete</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography component="div" variant="subtitle1">
    //                                   BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>

    //                             <Typography variant="subtitle2" color="text.secondary" component="div">
    //                               <s>Rp160.000</s>
    //                             </Typography>
    //                             <Grid container spacing={1}>
    //                               <Grid item xs={6} md={8}>
    //                                 <Typography variant="h5" color="black" component="div">
    //                                   <b>Rp320.000</b>
    //                                 </Typography>
    //                               </Grid>
    //                               <Grid item xs={4} md={4}>
    //                                 <Typography
    //                                   className="product-cart__quantityBox"
    //                                   variant="subtitle2"
    //                                   color="text.secondary"
    //                                   component="div"
    //                                 >
    //                                   <p>Quantity: 20</p>
    //                                 </Typography>
    //                               </Grid>
    //                             </Grid>
    //                           </CardContent>
    //                         </Box>
    //                       </Card>
    //                     </Grid>
    //                   </Grid>
    //                 </Box>
    //               </Grid>
    //               <Grid item xs={6}>
    //                 <Typography
    //                   className="product-cart__shoppingSummary"
    //                   variant="h5"
    //                   color="black"
    //                   component="div"
    //                 >
    //                   <b>ShoppingSummary</b>
    //                 </Typography>
    //                 <Card
    //                   className="product-cart__shoppingSummary"
    //                   sx={{
    //                     display: 'flex',
    //                     width: '80%',
    //                     height: 172,
    //                     boxShadow: 4,
    //                     marginTop: 4.6,
    //                   }}
    //                 >
    //                   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //                     <CardContent sx={{ flex: '1 0 auto' }}>
    //                       <Grid container spacing={0} className="mx-auto">
    //                         <Grid item xs={6} md={8}>
    //                           <Typography component="div" variant="subtitle1" color="text.secondary">
    //                             Subtotal (3 items)
    //                           </Typography>
    //                         </Grid>
    //                         <Grid item xs={4} md={4}>
    //                           <Typography
    //                             className="product-cart__quantityBox"
    //                             variant="subtitle2"
    //                             color="text.secondary"
    //                             component="div"
    //                           >
    //                             Rp250.000
    //                           </Typography>
    //                         </Grid>
    //                       </Grid>
    //                       <Grid container spacing={0}>
    //                         <Grid item xs={6} md={8}>
    //                           <Typography component="div" variant="subtitle1" color="text.secondary">
    //                             Promo/Disc
    //                           </Typography>
    //                         </Grid>
    //                         <Grid item xs={4} md={4}>
    //                           <Typography
    //                             className="product-cart__quantityBox"
    //                             variant="subtitle2"
    //                             color="text.secondary"
    //                             component="div"
    //                           >
    //                             Rp250.000
    //                           </Typography>
    //                         </Grid>
    //                       </Grid>
    //                       <Divider sx={{ width: 450, marginTop: 4, marginBottom: 2 }} />
    //                       <Grid container spacing={1}>
    //                         <Grid item xs={6} md={8}>
    //                           <Typography component="div" variant="subtitle1" color="color">
    //                             <b>Total</b>
    //                           </Typography>
    //                         </Grid>
    //                         <Grid item xs={4} md={4}>
    //                           <Typography
    //                             className="product-cart__quantityBox"
    //                             variant="subtitle1"
    //                             color="color"
    //                             component="div"
    //                           >
    //                             <b>Rp500.000</b>
    //                           </Typography>
    //                         </Grid>
    //                       </Grid>
    //                     </CardContent>
    //                   </Box>
    //                 </Card>
    //                 <Link to="/checkout-address">
    //                   <Button
    //                     variant="contained"
    //                     className="product-cart__buttonProcess"
    //                     sx={{ height: 50 }}
    //                   >
    //                     <b>Checkout</b>
    //                   </Button>
    //                 </Link>
    //               </Grid>
    //             </Grid>
    //           </Box>
    //         </Container>
    //       </React.Fragment>
    //     </Box>
  )
}

export default ProductCart
