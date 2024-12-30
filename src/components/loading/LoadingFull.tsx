import * as React from 'react'
import { ILoadingFullProps } from './interfaces'
import './LoadingFull.scss'

const LoadingFull = ({ isFullscreen, message = 'Loading...' }: ILoadingFullProps) => (
  <div className={`loading-full ${isFullscreen && 'loading-full--screen'}`}>
    <div className="loader">
      <div className="loader_overlay"></div>
      <div className="loader_cogs">
      <img src="/assets/img/cody-preloader.png" alt="Loading" />
        {/* <div className="loader_cogs__top">
          <div className="top_part"></div>
          <div className="top_part"></div>
          <div className="top_part"></div>
          <div className="top_hole"></div>
        </div>
        <div className="loader_cogs__left">
          <div className="left_part"></div>
          <div className="left_part"></div>
          <div className="left_part"></div>
          <div className="left_hole"></div>
        </div>
        <div className="loader_cogs__bottom">
          <div className="bottom_part"></div>
          <div className="bottom_part"></div>
          <div className="bottom_part"></div>
          <div className="bottom_hole"></div>
        </div> */}
        <p className="text-center text-black">{message}</p>
      </div>
    </div>
  </div>
)

export default LoadingFull
