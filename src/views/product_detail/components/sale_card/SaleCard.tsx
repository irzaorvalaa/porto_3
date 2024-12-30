import './SaleCard.scss'
import data from '../../../../assets/data/data.json'
import { Link } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div className="sale-card">
      <div className="sale-card__title">
        <h1>Sale</h1>
      </div>
      <div className="sale-card__container">
        {data.map((book: any) => (
          <div className="sale-card__item" key={book.id}>
            <Link to={`/product-detail?item-id=${book.id}`} key={book.id}>
              {book.discountType === 2 ? (
                <h1 className="sale-card__item--discount">{book.discountValue}% OFF</h1>
              ) : (
                <div></div>
              )}
              <div className="sale-card__item--img">
                <img src={book.image} alt="uniform" />
              </div>
              <div className="sale-card__item--text">
                <div className="sale-card__item--text__name">
                  <h1 className="sale-card__item--text__name--title">{book.title}</h1>
                  <h1 className="sale-card__item--text__name--merchant">{book.merchant}</h1>
                </div>
                <div className="sale-card__item--text__body">
                  <s className="sale-card__item--text__body--price">Rp {book.price}</s>
                  <h1 className="sale-card__item--text__body--discounted">
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

export default HomeCard
