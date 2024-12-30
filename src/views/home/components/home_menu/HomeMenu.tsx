import * as React from 'react'
import { ButtonBase } from '@mui/material'
import { homeMenus } from './constants'
import { IHomeMenu, IHomeMenuProps, IHomeMenuType } from './interfaces'
import { ReactComponent as LostFoundIcon } from '../../../../assets/svg/lost-and-found.svg'
import { ReactComponent as Favorite } from '../../../../assets/svg/favorites.svg'
import { ReactComponent as EbookIcon } from '../../../../assets/svg/e-book.svg'
import { ReactComponent as CatalogIcon } from '../../../../assets/svg/catalog.svg'
import { ReactComponent as JournalIcon } from '../../../../assets/svg/journal.svg'
import { ReactComponent as EmagazineIcon } from '../../../../assets/svg/e-magazine.svg'
import { ReactComponent as MultimediaIcon } from '../../../../assets/svg/multimedia.svg'
import './HomeMenu.scss'

const HomeMenu = ({ onClick }: IHomeMenuProps) => {
  const getIcon = (type: IHomeMenuType) => {
    switch (type) {
      case 'favorite':
        return <Favorite />
      case 'ebook':
        return <EbookIcon />
      case 'catalog':
        return <CatalogIcon />
      case 'journal':
        return <JournalIcon />
      case 'emagazine':
        return <EmagazineIcon />
      case 'multimedia':
        return <MultimediaIcon />
      default:
        return ''
    }
  }

  const handleClick = (menu: IHomeMenu) => {
    if (onClick) onClick(menu)
  }

  return (
    <div className="home-menu">
      <div className="home-menu__container">
        {homeMenus.map((menu, index) => (
          <ButtonBase key={index} onClick={() => handleClick(menu)} className="home-menu__button">
            {getIcon(menu.type)}
            <div className="home-menu__buttonlabel">{menu.label}</div>
          </ButtonBase>
        ))}
      </div>
    </div>
  )
}

export default HomeMenu
