import React from 'react'
import { Link } from 'react-router-dom'
import './HomeBTSCategory.scss'

const HomeBTSCategory = () => {
  return (
    <div className="home-bts-category">
      <Link to="/product-category">
        <div className="home-bts-category__item home-bts-category__item--item1">
          <div className="home-bts-category__item--header">
            <h1>Back to School</h1>
            <h2 className="text-xs">New Academicyear 2023 - 2024</h2>
          </div>
          <div className="home-bts-category__item--footer">
            <h1>Textbook</h1>
          </div>
        </div>
      </Link>
      <div className="home-bts-category__item home-bts-category__item--item2">
        <div className="home-bts-category__item--header">
          <h1>Back to School</h1>
          <h2>New Academicyear 2023 - 2024</h2>
        </div>
        <div className="home-bts-category__item--footer">
          <h1>Uniform</h1>
        </div>
      </div>
      <div className="home-bts-category__item home-bts-category__item--item3">
        <div className="home-bts-category__item--header">
          <h1>Back to School</h1>
          <h2>New Academicyear 2023 - 2024</h2>
        </div>
        <div className="home-bts-category__item--footer">
          <h1>Stationery / Art Material</h1>
        </div>
      </div>
    </div>
  )
}

export default HomeBTSCategory
