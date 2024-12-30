import { Chip, Typography } from '@mui/material'
import React from 'react'
import './HomeCategory.scss'

const HomeCategoty = () => {
  const handleClick = () => {}
  return (
    <div className="home-category">
      <Typography>
        <b>Go quickly to: </b>
      </Typography>
      <Chip label="Tumbler" variant="outlined" onClick={handleClick} />
      <Chip label="Book" variant="outlined" onClick={handleClick} />
      <Chip label="Uniform" variant="outlined" onClick={handleClick} />
      <Chip label="Gift Card" variant="outlined" onClick={handleClick} />
      <Chip label="T-shirt" variant="outlined" onClick={handleClick} />
      <Chip label="Stationery" variant="outlined" onClick={handleClick} />
      <Chip label="Merchandise" variant="outlined" onClick={handleClick} />
    </div>
  )
}

export default HomeCategoty
