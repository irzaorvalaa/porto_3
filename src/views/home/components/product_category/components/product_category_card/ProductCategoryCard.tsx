import React from 'react'
import { Link } from 'react-router-dom'
import data from '../../../../../../assets/data/data_card.json'
import './HomeProductCardCategory.scss'

const ProductCategoryCard = () => {
  return (
    <div className="category-card">
      {data.map((book, key) => (
        <Link to={`/product-detail?item-id=${book.id}`} key={book.id}>
          <div className="category-card__container" key={book.id}>
            <div className="category-card__container--img">
              <img src={book.image} alt="" height={100} width={170} />
              <h1 className="category-card__container--text__discount">50% OFF</h1>
            </div>
            <div className="category-card__container--text">
              <h1 className="category-card__container--text__title">{book.title}</h1>
              <h1 className="category-card__container--text__merchant">School Serpong</h1>
              <div className="category-card__container--text__price">
                <s>{book.disc}</s>
              </div>
              <h1 className="category-card__container--text__price-fix">{book.price}</h1>
              <h1 className="category-card__container--text__total-sold">Terjual: 100+</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductCategoryCard
