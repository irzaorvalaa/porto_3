import * as React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material'
import { headerMenus } from './contants'
import { IHeaderMenu, IHeaderProps } from './interfaces'
import { ReactComponent as MenuIcon } from '../../assets/svg/icons/menu.svg'
import { ReactComponent as SearchIcon } from '../../assets/svg/icons/search.svg'
import './Header.scss'

// Components
import AvatarMenu from '../avatar_menu'

const Header = ({
  user,
  isLoggedIn = false,
  onChangePassword,
  onLogout,
  onClickProfile,
  onClickMenu,
  window
}: IHeaderProps) => {
  // const { window, onClickMenu } = props

  // State
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const container = window !== undefined ? () => window().document.body : undefined

  const handleClickMenu = (menu: IHeaderMenu) => {
    if (onClickMenu) onClickMenu(menu)
  }

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container">
          <div className="header__row">
            <div className="header__mobilemenu">
              <IconButton onClick={toggleDrawer}>
                <MenuIcon className="header__menuicon" />
              </IconButton>
            </div>
            <div className="header__logo">
              <NavLink to="/">
                <img src="/images/logo-LKC-white.png" alt="BINUS Library & Knowledge Center" />
              </NavLink>
            </div>
            <div className="header__search">
              <TextField
                variant="outlined"
                placeholder="Search books"
                size="small"
                className="header__searchfield"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="header__searchicon" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                className="button button--secondary-fe header__searchbutton"
                disableElevation
              >
                Search
              </Button>
            </div>
            <div className="header__account">
              <AvatarMenu 
               name={user ? user.name : '-'} 
               onLogout={onLogout} />
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__container">
          <div className="header__row">
            {headerMenus.map((menu, index) =>
              menu.isLink ? (
                <NavLink
                  key={index}
                  to={menu.url}
                  className={({ isActive }) =>
                    `header__menu ${isActive ? 'header__menu--active' : ''}`
                  }
                >
                  <ButtonBase className="header__menuname">{menu.title}</ButtonBase>
                </NavLink>
              ) : (
                <ButtonBase
                  key={index}
                  className="header__menuname"
                  onClick={() => handleClickMenu(menu)}
                >
                  {menu.title}
                </ButtonBase>
              ),
            )}
          </div>
        </div>
      </div>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <div>
            <div className="header__logo--mobile">
              <NavLink to="/" onClick={toggleDrawer}>
                <img src="/images/logo-LKC-white.png" alt="BINUS Library & Knowledge Center" />
              </NavLink>
            </div>
            <List>
              {headerMenus.map((menu, index) => (
                <ListItem key={index} disablePadding>
                  <NavLink to={menu.url} className="header__linklist">
                    <ListItemButton onClick={toggleDrawer}>
                      <ListItemText primary={menu.title} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </nav>
    </header>
  )
}

export default Header
