import * as React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Image1 from '../../../../assets/img/join-our-binusian-community.png'

const LoginSlider = () => {
  const images = React.useMemo(() => [Image1], [])

  return (
    <Slider dots autoplay autoplaySpeed={3000} slidesToShow={1} slidesToScroll={1} arrows={false}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} />
        </div>
      ))}
    </Slider>
  )
}

export default LoginSlider
