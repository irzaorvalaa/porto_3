import * as React from 'react'
import { Skeleton, Typography } from '@mui/material'
import Slider, { CustomArrowProps } from 'react-slick'
import { ReactComponent as ArrowRightIcon } from '../../../../assets/svg/icons/arrow-right.svg'
import { ReactComponent as ArrowLeftIcon } from '../../../../assets/svg/icons/arrow-left.svg'
import { IHomeSliderProps } from './interfaces'
import isValidUrl from '../../../../utilities/isValidUrl'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './HomeSlider.scss'

import { ReactComponent as NoData } from '../../../../assets/svg/no-data.svg'

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <button
    {...props}
    className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    data-slidecount={slideCount}
    type="button"
  >
    <ArrowLeftIcon className="home-slider__icon" />
  </button>
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <button
    {...props}
    className={
      'slick-next slick-arrow' + (currentSlide === Number(slideCount) - 1 ? ' slick-disabled' : '')
    }
    aria-hidden="true"
    aria-disabled={currentSlide === Number(slideCount) - 1 ? true : false}
    type="button"
  >
    <ArrowRightIcon className="home-slider__icon" />
  </button>
)

const HomeSlider = ({ data = [], loading = false }: IHomeSliderProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false)

  const handleBeforeChange = () => setIsDragging(true)
  const handleAfterChange = () => setTimeout(() => setIsDragging(false), 100)

  return (
    <div className="home-slider">
      <Slider
        dots
        autoplay
        autoplaySpeed={3000}
        slidesToShow={1}
        slidesToScroll={1}
        nextArrow={<SlickArrowRight />}
        prevArrow={<SlickArrowLeft />}
        beforeChange={handleBeforeChange}
        afterChange={handleAfterChange}
      >
        {loading ? (
          <Skeleton className="home-slider__loading" />
        ) : data.length > 0 ? (
          data.map((slide, index) => (
            <div key={index} className="home-slider__wrapper">
              {isValidUrl(slide.bannerImgUrl) && (
                <a
                  href={slide.externalUrl != '' && !isDragging ? slide.externalUrl : '#'}
                  target={slide.externalUrl != '' ? '_blank' : ''}
                  rel="noreferrer"
                >
                  <img src={slide.bannerImgUrl} className="home-slider__image" />
                </a>  
              )}
              {/* <div className="home-slider__content">
                <Typography variant="caption" className="home-slider__title">
                  {slide.headline}
                </Typography>
                <Typography variant="caption" className="home-slider__caption">
                  {slide.caption}
                </Typography>
              </div> */}
            </div>
          ))
        ) : (
          <div className="home-slider__empty">
            <NoData />
            <div className="home-slider__empty--title">No banner available</div>
          </div>
        )}
      </Slider>
    </div>
  )
}

export default HomeSlider
