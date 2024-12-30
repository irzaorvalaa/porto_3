import {
  Box,
  Button,
  Divider,
  FormControl,
  imageListClasses,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import data from '../../assets/data/data.json'
import useQuery from '../../helpers/useQuery'
import SaleCard from './components/sale_card/SaleCard'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import './ProductDetail.scss'
import { Link } from 'react-router-dom'
import VideoPopup from './components/video_popup/VideoPopup'
const ProductDetail = () => {
  const query = useQuery()
  const book = data.filter((item: any) => item.id == query.get('item-id'))

  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  const [count, setCount] = useState(1)

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="detail-container">
      <div className="product-detail">
        <SimpleReactLightbox>
          <SRLWrapper>
            <div className="flex flex-row">
              <div className="product-detail__listImg">
                {book[0].media.map((item) =>
                  item.ytEmbed === '' ? (
                    <img src={item.mediaUrl} key={item.id} />
                  ) : (
                    <Box className="product-detail_listImg--video">
                      <iframe
                        width="94%"
                        height="200%"
                        src={item.ytEmbed}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media"
                        allowFullScreen={true}
                      />
                    </Box>
                  ),
                )}
              </div>
              <div className="product-detail__images">
                <img
                  className="product-detail__images--img"
                  src={book?.[0]?.image}
                  alt={book?.[0]?.title}
                />
              </div>
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>

        <div className="product-detail__text">
          <div>
            <Typography className="product-detail__text--title">{book?.[0]?.title}</Typography>
          </div>
          <div>
            <Typography className="product-detail__text--sold">
              Terjual : 100 | Out of Stock
            </Typography>
          </div>
          <div className="product-detail__text--details">
            <Typography>Details</Typography>
            <Typography> Bahan : Katun</Typography>
            <Typography>Warna : </Typography>
            <Typography>Size : All Size</Typography>
          </div>
          <div className="product-detail__text--desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque explicabo a ex eius
            illo, veniam ea reprehenderit sed saepe consequatur, dolorum quidem? Eos, praesentium
            neque numquam asperiores labore maxime commodi?
          </div>
          <div className="product-detail__text--contact">
            <Typography>Info Menarik Lainnya : </Typography>
            <Typography> Instagram : beehive_binus</Typography>
            <Typography>Email : beehive@binus</Typography>
            <Typography className="mt-6">Chat untuk memastikan stock</Typography>
            <Divider />
          </div>
          <div className="product-detail__text--variant">
            <Typography>Choose Variant</Typography>
            <div className="product-detail__text--variant__select">
              <div className="product-detail__text--variant__select--1">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </div>
              <div className="product-detail__text--variant__select--1">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <div className="product-detail__text--price">
            <div className="product-detail__text--price__discounted">
              <s id="price">Rp. {book?.[0]?.price}</s>

              <div className="product-detail__text--price__discounted--value">
                {book?.[0]?.discountType == 2 ? (
                  <h1>{book?.[0]?.discountValue}%</h1>
                ) : (
                  <h1>Rp. {book?.[0]?.discountValue}</h1>
                )}
              </div>
            </div>
            <div>Rp. {book?.[0]?.discountedPrice} </div>
            <div className="product-detail__text--price__qty">
              <Button className="product-detail__text--price__qty--btn" onClick={handleOpen}>
                -
              </Button>
              <h1 className="product-detail__text--price__qty--text">{count}</h1>
              <Button
                className="product-detail__text--price__qty--btn"
                onClick={() => setCount(count + 1)}
              >
                +
              </Button>
            </div>
            <div>
              <Link to="/product-cart">
                <Button className="product-detail__text--price__qty--btn2">Add to Cart</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SaleCard />
      </div>

      <VideoPopup open={open} handleClose={handleClose} />
    </div>
  )
}

export default ProductDetail
