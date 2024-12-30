import * as React from 'react'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import './Page404.scss'

const Page404 = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onBackToHome = () => {
    return navigate('/', { state: { from: location }, replace: true })
  }
  return (
    <div className="page-404">
      <div className="page-404__container">
        <div className="page-404__text page-404__text--oops">Oops!</div>
        <div className="page-404__text page-404__text--subs">
          It looks like you have taken a wrong turn.
        </div>
        <div className="page-404__text page-404__text--404">404</div>
        <div className="page-404__text page-404__text--not-found">Page Not Found</div>
        <Button
          variant="contained"
          className="page-404__button button--secondary"
          onClick={onBackToHome}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default Page404
