import './HomeCard.scss'
import data from '../../../../assets/data/data.json'
import { Link } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div className="home-card">
      <div className="home-card__title">
        <h1>MANDATORY ITEMS</h1>
      </div>
      <div className="home-card__container">
        {data.map((book: any) => (
          <Link to={`/product-detail?item-id=${book.id}`} key={book.id}>
            <div className="home-card__item" key={book.id}>
              {book.discountType === 2 ? (
                <h1 className="home-card__item--discount">{book.discountValue}% OFF</h1>
              ) : (
                <div></div>
              )}
              <div className="home-card__item--img">
                <img src={book.image} alt="uniform" />
              </div>
              <div className="home-card__item--text">
                <div className="home-card__item--text__name">
                  <h1 className="home-card__item--text__name--title">{book.title}</h1>
                  <h1 className="home-card__item--text__name--merchant">{book.merchant}</h1>
                </div>
                <div className="home-card__item--text__body">
                  <s className="home-card__item--text__body--price">Rp {book.price}</s>
                  <h1 className="home-card__item--text__body--discounted">
                    Rp.{book.discountedPrice}
                  </h1>
                </div>
                <h1 className="text-xs text-gray-400">Terjual : 100+</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomeCard
