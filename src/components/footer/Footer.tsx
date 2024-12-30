import { NavLink } from 'react-router-dom'
import { URL_FACEBOOK, URL_INSTAGRAM, URL_YOUTUBE } from '../../constants/Parameter'
import './Footer.scss'

import { ReactComponent as FacebookIcon } from '../../assets/svg/icons/facebook.svg'
import { ReactComponent as InstagramIcon } from '../../assets/svg/icons/instagram.svg'
import { ReactComponent as YoutubeIcon } from '../../assets/svg/icons/youtube.svg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          {/* <div className="footer__logo">
            <NavLink to="/">
              <img src="/images/logo-binus-white.png" alt="Binus University" />
            </NavLink>
          </div> */}
          <div className="footer__campus">
            <div className="footer__title">BINUS Library &amp; Knowledge Center</div>
            <div className="footer__content">
              Email: library@binus.edu
              <br />
              WA: 0878-0967-0004
              <div className="footer__sosmed">
                <ul>
                  <li>
                    <a
                      className="footer__link footer__link--sosmed"
                      target="_blank"
                      rel="noreferrer"
                      href={URL_FACEBOOK}
                    >
                      <FacebookIcon className="footer__link--icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer__link footer__link--sosmed"
                      target="_blank"
                      rel="noreferrer"
                      href={URL_INSTAGRAM}
                    >
                      <InstagramIcon className="footer__link--icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer__link footer__link--sosmed"
                      target="_blank"
                      rel="noreferrer"
                      href={URL_YOUTUBE}
                    >
                      <YoutubeIcon className="footer__link--icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__address">
            <div className="footer__title">&nbsp;</div>
            <div className="footer__content"></div>
          </div>
          <div className="footer__servicehours">
            <div className="footer__title">Links</div>
            <div className="footer__content">
              <ul className="footer__hours">
                <li>
                  <a href="https://support.binus.ac.id/" target="_blank" rel="noreferrer">
                    BINUS Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copyright">
            Copyright © BINUS Library &amp; Knowledge Center. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
