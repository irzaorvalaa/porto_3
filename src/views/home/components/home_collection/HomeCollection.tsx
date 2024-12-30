import * as React from 'react'
import { ButtonBase, IconButton, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Slider, { CustomArrowProps } from 'react-slick'
import { IHomeCollectionProps } from './interfaces'
import { ReactComponent as ChevronRightIcon } from '../../../../assets/svg/icons/chevron-right.svg'
import { ReactComponent as ChevronLeftIcon } from '../../../../assets/svg/icons/chevron-left.svg'
import './HomeCollection.scss'

import { ReactComponent as NoData } from '../../../../assets/svg/no-data.svg'

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <IconButton
    {...props}
    className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    data-slidecount={slideCount}
  >
    <ChevronLeftIcon className="home-collection__icon" />
  </IconButton>
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const slidesToShow = matches ? 2 : 5

  return (
    <IconButton
      {...props}
      className={
        'slick-next slick-arrow' +
        (Number(currentSlide) >= Number(slideCount) - slidesToShow ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={Number(currentSlide) >= Number(slideCount) - slidesToShow ? true : false}
      data-slidecount={slideCount}
    >
      <ChevronRightIcon className="home-collection__icon" />
    </IconButton>
  )
}

const HomeCollection = ({ data = [], loading = false }: IHomeCollectionProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false)

  const handleBeforeChange = () => setIsDragging(true)
  const handleAfterChange = () => setTimeout(() => setIsDragging(false), 100)

  return (
    <div className="home-collection">
      <div className="home-collection__container">
        <div className="home-collection__header">BINUS COLLECTION</div>
        <Slider
          infinite={false}
          autoplaySpeed={300}
          slidesToShow={data.length > 0 || loading ? 5 : 2}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ]}
          nextArrow={<SlickArrowRight />}
          prevArrow={<SlickArrowLeft />}
          beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}
        >
          {loading ? (
            Array.from({ length: 5 }, (_, index) => (
              <div key={index}>
                <Skeleton variant="rectangular" className="home-collection__loading--img" />
                <Skeleton variant="text" className="home-collection__loading--text" />
              </div>
            ))
          ) : data.length > 0 ? (
            data.map((slide, index) => (
              <NavLink key={index} to={isDragging ? '/' : `/detail/${slide.id}`}>
                <ButtonBase className="home-collection__slide">
                  <img src={slide.collectionImgUrl} />
                  <div className="home-collection__title">{slide.title}</div>
                </ButtonBase>
              </NavLink>
            ))
          ) : (
            <div className="home-collection__empty">
              <NoData />
              <div className="home-collection__empty--title">No collection available</div>
            </div>
          )}
        </Slider>
      </div>
    </div>
  )
}

export default HomeCollection
