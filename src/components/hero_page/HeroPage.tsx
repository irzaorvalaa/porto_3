import * as React from 'react'
import { IHeroPageProps } from './interfaces'
import './HeroPage.scss'

const HeroPage = ({ title }: IHeroPageProps) => {
  return (
    <div className="hero-page__container">
      <h1 className="hero-page__title">{title}</h1>
    </div>
  )
}

export default HeroPage
