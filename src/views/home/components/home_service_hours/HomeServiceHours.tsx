import * as React from 'react'
import { IconButton, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Slider, { CustomArrowProps } from 'react-slick'
import { ReactComponent as ChevronRightIcon } from '../../../../assets/svg/icons/chevron-right.svg'
import { ReactComponent as ChevronLeftIcon } from '../../../../assets/svg/icons/chevron-left.svg'
import { ReactComponent as TimeIcon } from '../../../../assets/svg/icons/time.svg'
import { IHomeServiceHoursProps } from './interfaces'
import './HomeServiceHours.scss'

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <IconButton
    {...props}
    className={'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    data-slidecount={slideCount}
  >
    <ChevronLeftIcon className="home-service-hours__icon" />
  </IconButton>
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const slidesToShow = matches ? 1 : 3

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
      <ChevronRightIcon className="home-service-hours__icon" />
    </IconButton>
  )
}

const HomeServiceHours = ({ data = [], loading = false }: IHomeServiceHoursProps) => {
  return (
    <div className="home-service-hours">
      <div className="home-service-hours__container">
        <div className="home-service-hours__title">SERVICE HOURS</div>
        <div className="home-service-hours__content">
          <Slider
            infinite={false}
            autoplaySpeed={300}
            slidesToShow={data.length > 0 || loading ? 3 : 1}
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
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
            nextArrow={<SlickArrowRight />}
            prevArrow={<SlickArrowLeft />}
          >
            {loading ? (
              Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="home-service-hours__slidewrapper">
                  <div className="home-service-hours__slidegap" />
                  <div className="home-service-hours__slide">
                    <Skeleton variant="rounded" className="home-service-hours__loading--img" />
                    <Skeleton variant="text" className="home-service-hours__loading--text" />
                  </div>
                  <div className="home-service-hours__slidegap" />
                </div>
              ))
            ) : data.length > 0 ? (
              data.map((slide, index) => (
                <div key={index} className="home-service-hours__slidewrapper">
                  <div className="home-service-hours__slidegap" />
                  <div className="home-service-hours__slide">
                    <div className="home-service-hours__slide--content">
                      <div className="home-service-hours__item">
                        <TimeIcon />
                        <div className="home-service-hours__item--title">{slide.name}</div>
                        <div className="home-service-hours__item--times">
                          {slide.serviceHour.map((hour, index) => (
                            <div key={index} className="home-service-hours__item--days">
                              {hour.dayName}: {hour.startTime}-{hour.endTime}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home-service-hours__slidegap" />
                </div>
              ))
            ) : (
              <div className="home-service-hours__empty">No data</div>
            )}
          </Slider>
          {/**
          <div className="home-service-hours__item">
            <TimeIcon />
            <div className="home-service-hours__item--title">Vacation</div>
            <div className="home-service-hours__item--times">
              <div className="home-service-hours__item--days">
                Mondays-Fridays: 08:00 AM-05:00 PM
              </div>
              <div className="home-service-hours__item--days">Saturdays: 08:00 AM-03:00 PM</div>
            </div>
          </div>
          <div className="home-service-hours__item">
            <TimeIcon />
            <div className="home-service-hours__item--title">Regular</div>
            <div className="home-service-hours__item--times">
              <div className="home-service-hours__item--days">
                Mondays-Fridays: 08:00 AM-05:00 PM
              </div>
              <div className="home-service-hours__item--days">Saturdays: 08:00 AM-03:00 PM</div>
            </div>
          </div>
          <div className="home-service-hours__item">
            <TimeIcon />
            <div className="home-service-hours__item--title">Compact</div>
            <div className="home-service-hours__item--times">
              <div className="home-service-hours__item--days">
                Mondays-Fridays: 08:00 AM-05:00 PM
              </div>
              <div className="home-service-hours__item--days">Saturdays: 08:00 AM-03:00 PM</div>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  )
}

export default HomeServiceHours
