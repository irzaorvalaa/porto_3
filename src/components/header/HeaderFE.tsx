import * as React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
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
import { ReactComponent as Ribbon } from '../../assets/svg/ribbon.svg'
import { ReactComponent as MenuIcon } from '../../assets/svg/icons/menu.svg'
import { ReactComponent as SearchIcon } from '../../assets/svg/icons/search.svg'
import './Header.scss'

// Components
import AvatarMenuFE from '../avatar_menu/AvatarMenuFE'

const HeaderFE = ({ user, onLogout, onClickMenu, window }: IHeaderProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  // State
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false)
  const [keyword, setKeyword] = React.useState<string>('')

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const container = window !== undefined ? () => window().document.body : undefined

  const handleClickMenu = (menu: IHeaderMenu) => {
    if (onClickMenu) onClickMenu(menu)
  }

  const handleSearch = () => {
    if (keyword) {
      const keywordValue = encodeURIComponent(keyword)
      navigate(`/search/${keywordValue}`, { state: { from: location }, replace: true })
      setKeyword('')
    }
  }

  return (
    <header className="header">
      <div className="header__blackbar"></div>
      <div className="header__top">
        <div className="header__container">
          <div className="header__row">
            <div className="header__mobilemenu">
              <IconButton onClick={toggleDrawer}>
                <MenuIcon className="header__menuicon" />
              </IconButton>
            </div>
            <div className="header__ribbon">
              <Ribbon />
            </div>
            <div className="header__logo">
              <NavLink to="/">
                <img src="/images/logo-LKC.png" alt="BINUS Library & Knowledge Center" />
              </NavLink>
            </div>
            <div className="header__search">
              <TextField
                variant="outlined"
                placeholder="Search books"
                size="small"
                className="header__searchfield"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                inputProps={{
                  onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                      handleSearch()
                    }
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="header__searchicon" />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Button
                variant="contained"
                color="secondary"
                className="button button--secondary-fe header__searchbutton"
                disableElevation
                onClick={handleSearch}
              >
                Search
              </Button> */}
            </div>
            {user?.userID !== '' ? (
              <div className="header__account">
                <AvatarMenuFE
                  name={user ? user.name : '-'}
                  src={user ? user?.photoUrl : ''}
                  onLogout={onLogout}
                />
              </div>
            ) : (
              <div className="header__account">
                <span className="w-12" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__container">
          <div className="header__row">
            {headerMenus.map((menu, index) =>
              menu.isLink ? (
                <NavLink key={index} to={menu.url}>
                  <ButtonBase component="div" className="header__menuname">
                    {menu.title}
                  </ButtonBase>
                </NavLink>
              ) : (
                user?.userID != '' && (
                  <ButtonBase
                    key={index}
                    component="a"
                    className="header__menuname"
                    onClick={() => handleClickMenu(menu)}
                  >
                    {menu.title}
                  </ButtonBase>
                )
              ),
            )}
            <a href="http://library.binus.ac.id/" target="_blank" rel="noreferrer">
              <ButtonBase component="div" className="header__menuname">
                More Library Services
              </ButtonBase>
            </a>
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
                <img src="/images/logo-LKC.png" alt="BINUS Library & Knowledge Center" />
              </NavLink>
            </div>
            <List>
              {headerMenus.map((menu, index) => (
                <ListItem key={index} disablePadding>
                  {menu.isLink ? (
                    <NavLink to={menu.url} className="header__linklist">
                      <ListItemButton onClick={toggleDrawer}>
                        <ListItemText primary={menu.title} />
                      </ListItemButton>
                    </NavLink>
                  ) : (
                    <ListItemButton
                      onClick={() => {
                        toggleDrawer()
                        handleClickMenu(menu)
                      }}
                    >
                      <ListItemText primary={menu.title} />
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </nav>
    </header>
  )
}

export default HeaderFE
