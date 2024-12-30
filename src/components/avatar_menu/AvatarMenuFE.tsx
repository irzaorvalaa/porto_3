import * as React from 'react'
import { Avatar, Button, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { AvatarMenuProps } from './interfaces'
import './AvatarMenu.scss'

// SVG Icon
import { ReactComponent as LogoutIcon } from '../../assets/svg/icons/logout.svg'
import { ReactComponent as PasswordIcon } from '../../assets/svg/icons/password.svg'
import { ReactComponent as ProfileIcon } from '../../assets/svg/icons/profile.svg'
import { Link } from 'react-router-dom'

import PersonIcon from '@mui/icons-material/Person'

const AvatarMenuFE = ({
  name,
  userType,
  src,
  showName = true,
  showChangePassword = false,
  showProfile = false,
  onLogout,
  onChangePassword,
  onClickProfile,
}: AvatarMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getUserType = () => {
    return null
  }

  return (
    <React.Fragment>
      <Button
        onClick={handleClick}
        size="small"
        className="avatar-menu__btn"
        aria-controls={open ? 'avatar-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar
          src={src || require('../../assets/img/avatar.png')}
          className="avatar-menu__avatar--fe"
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="avatar-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {showName && (
          <MenuItem disabled className="avatar-menu__name">
            {name}
          </MenuItem>
        )}
        {showName && <Divider />}
        <MenuItem>
          <Link to="/my-account">
            <ListItemIcon>
              <PersonIcon className="avatar-menu__icon" />
            </ListItemIcon>
            My Account
          </Link>
        </MenuItem>

        {showProfile && (
          <MenuItem onClick={onClickProfile}>
            <ListItemIcon>
              <ProfileIcon className="avatar-menu__icon" />
            </ListItemIcon>
            My Profile
          </MenuItem>
        )}

        {showChangePassword && (
          <MenuItem onClick={onChangePassword}>
            <ListItemIcon>
              <PasswordIcon className="avatar-menu__icon" />
            </ListItemIcon>
            Change Password
          </MenuItem>
        )}

        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon className="avatar-menu__icon" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default AvatarMenuFE
