import * as React from 'react'
import { TextField, FormControlLabel, Checkbox, Divider, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import './HomeProductCategory.scss'
import ProductCategoryCard from './components/product_category_card/ProductCategoryCard'
import ProductCard from './components/product_card/ProductCard'
const HomeProductCategory = () => {
  const [openCategory, setOpenCategory] = React.useState(false)

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory)
  }

  const [openMerchant, setOpenMerchant] = React.useState(false)

  const handleOpenMerchant = () => {
    setOpenMerchant(!openMerchant)
  }
  const [openPrice, setOpenPrice] = React.useState(false)

  const handleOpenPrice = () => {
    setOpenPrice(!openPrice)
  }
  const [openColor, setOpenColor] = React.useState(false)

  const handleOpenColor = () => {
    setOpenColor(!openColor)
  }
  const [openSize, setOpenSize] = React.useState(false)

  const handleOpenSize = () => {
    setOpenSize(!openSize)
  }
  const [openPromo, setOpenPromo] = React.useState(false)

  const handleOpenPromo = () => {
    setOpenPromo(!openPromo)
  }
  return (
    <div>
      <div className="search">
        <div className="search__container">
          <div className="search__filter-icon">
            <IconButton onClick={handleOpenCategory}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
          <div className="search__filter-content">Category</div>
          <div className="search__filter-divider">
            <Divider />
          </div>
          {openCategory ? (
            <div className="search__filter-checkbox">
              <FormControlLabel control={<Checkbox />} label="Stationary" />
              <FormControlLabel control={<Checkbox />} label="T-Shirt" />
              <FormControlLabel control={<Checkbox />} label="Swimwear" />
              <FormControlLabel control={<Checkbox />} label="Textbook" />
            </div>
          ) : null}

          <div className="search__filter-icon">
            <IconButton onClick={handleOpenMerchant}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>

          <div className="search__filter-content">Merchant</div>
          {openMerchant ? (
            <div className="search__filter-checkbox">
              <FormControlLabel control={<Checkbox />} label="School Bekasi" />
              <FormControlLabel control={<Checkbox />} label="School Simprug" />
              <FormControlLabel control={<Checkbox />} label="School Serpong" />
            </div>
          ) : null}
          <div className="search__filter-divider">
            <Divider />
          </div>
          <div className="search__filter-icon">
            <IconButton onClick={handleOpenPrice}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
          <div className="search__filter-content">Price</div>
          {openPrice ? (
            <div className="search__filter-textfield">
              <TextField
                label="Minimum Price"
                id="outlined-size-small"
                defaultValue="Rp_"
                size="small"
                sx={{ width: 250 }}
              />
              <TextField
                label="Maximum Price"
                id="outlined-size-small"
                defaultValue="Rp_"
                size="small"
                sx={{ width: 250, marginTop: 3 }}
              />
            </div>
          ) : null}
          <div className="search__filter-divider">
            <Divider />
          </div>
          <div className="search__filter-icon">
            <IconButton onClick={handleOpenColor}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
          <div className="search__filter-content">Color</div>
          {openColor ? (
            <div className="search__filter-multi-checkbox">
              <FormControlLabel control={<Checkbox />} label="Black" />
              <FormControlLabel control={<Checkbox />} label="White" />
              <FormControlLabel control={<Checkbox />} label="Green" />
              <FormControlLabel control={<Checkbox />} label="Red" />
              <FormControlLabel control={<Checkbox />} label="Blue" />

              <FormControlLabel control={<Checkbox />} label="Grey" />
              <FormControlLabel control={<Checkbox />} label="Orange" />
              <FormControlLabel control={<Checkbox />} label="Purple" />
              <FormControlLabel control={<Checkbox />} label="Yellow" />
              <FormControlLabel control={<Checkbox />} label="Navy" />
            </div>
          ) : null}
          <div className="search__filter-divider">
            <Divider />
          </div>
          <div className="search__filter-icon">
            <IconButton onClick={handleOpenSize}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
          <div className="search__filter-content">Size</div>
          {openSize ? (
            <div className="search__filter-color-checkbox">
              <FormControlLabel control={<Checkbox />} label="XS" />
              <FormControlLabel control={<Checkbox />} label="S" />
              <FormControlLabel control={<Checkbox />} label="M" />
              <FormControlLabel control={<Checkbox />} label="L" />
              <FormControlLabel control={<Checkbox />} label="XL" />
            </div>
          ) : null}
          <div className="search__filter-divider">
            <Divider />
          </div>
          <div className="search__filter-icon">
            <IconButton onClick={handleOpenPromo}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
          <div className="search__filter-content">Promo</div>
          {openPromo ? (
            <div className="search__filter-checkbox">
              <FormControlLabel control={<Checkbox />} label="Free Delivery" />
              <FormControlLabel control={<Checkbox />} label="Discount" />
            </div>
          ) : null}
        </div>

        <div>
          <ProductCard />
        </div>
      </div>
    </div>
  )
}

export default HomeProductCategory
