import './ProductCard.scss'
import data from '../../../../../../assets/data/data.json'
import { Link } from 'react-router-dom'

const ProductCard = () => {
  return (
    <div className="product">
      <div className="product__container">
        {data.map((book: any) => (
          <div className="product__item" key={book.id}>
            <Link to={`/product-detail?item-id=${book.id}`} key={book.id}>
              {book.discountType === 2 ? (
                <h1 className="product__item--discount">{book.discountValue}% OFF</h1>
              ) : (
                <div></div>
              )}
              <div className="product__item--img">
                <img src={book.image} alt="uniform" />
              </div>
              <div className="product__item--text">
                <div className="product__item--text__name">
                  <h1 className="product__item--text__name--title">{book.title}</h1>
                  <h1 className="product__item--text__name--merchant">{book.merchant}</h1>
                </div>
                <div className="product__item--text__body">
                  <s className="product__item--text__body--price">Rp {book.price}</s>
                  <h1 className="product__item--text__body--discounted">
                    Rp.{book.discountedPrice}
                  </h1>
                </div>
                <h1 className="text-xs text-gray-400">Terjual : 100+</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCard
