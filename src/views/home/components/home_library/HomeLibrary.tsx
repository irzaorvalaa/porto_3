import * as React from 'react'
import { IconButton, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Slider, { CustomArrowProps } from 'react-slick'
import { NavLink } from 'react-router-dom'
import { IHomeLibraryProps } from './interfaces'
import { ReactComponent as ChevronRightIcon } from '../../../../assets/svg/icons/chevron-right.svg'
import { ReactComponent as ChevronLeftIcon } from '../../../../assets/svg/icons/chevron-left.svg'
import './HomeLibrary.scss'

import { ReactComponent as NoData } from '../../../../assets/svg/no-data.svg'

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <IconButton
    {...props}
    className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    data-slidecount={slideCount}
  >
    <ChevronLeftIcon className="home-library__icon" />
  </IconButton>
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const slidesToShow = matches ? 2 : 3

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
      <ChevronRightIcon className="home-library__icon" />
    </IconButton>
  )
}

const HomeLibrary = ({ data = [], loading = false }: IHomeLibraryProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false)

  const handleBeforeChange = () => setIsDragging(true)
  const handleAfterChange = () => setTimeout(() => setIsDragging(false), 100)

  return (
    <div className="home-library">
      <div className="home-library__container">
        <div className="home-library__header">
          <div className="home-library__title">Category</div>
        </div>
        <div className="home-library__content">
          <Slider
            infinite={false}
            autoplaySpeed={300}
            slidesToShow={data.length > 0 || loading ? 6 : 2}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
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
              Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="home-library__slidewrapper">
                  <div className="home-library__slidegap" />
                  <div className="home-library__slide">
                    <Skeleton variant="rounded" className="home-library__loading--img" />
                    <Skeleton variant="text" className="home-library__loading--text" />
                  </div>
                  <div className="home-library__slidegap" />
                </div>
              ))
            ) : data.length > 0 ? (
              data.map((slide, index) => (
                <NavLink key={index} to={isDragging ? '/' : `/campus/${slide.id}`}>
                  <div key={index} className="home-library__slidewrapper">
                    <div className="home-library__slide--content">
                      <img src={slide.campusImgUrl || '/images/no-image.png'} />
                      <div className="home-library__slide--title">{slide.name}</div>
                    </div>
                  </div>
                  <div className="home-library__slidegap" />
                </NavLink>
              ))
            ) : (
              <div className="home-library__empty">
                <NoData />
                <div className="home-library__empty--title">No library available</div>
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HomeLibrary
