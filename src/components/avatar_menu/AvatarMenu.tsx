import * as React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { AvatarMenuProps } from "./interfaces";
import "./AvatarMenu.scss";

// SVG Icon
import { ReactComponent as LogoutIcon } from "../../assets/svg/icons/logout.svg";
import { ReactComponent as PasswordIcon } from "../../assets/svg/icons/password.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svg/icons/profile.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AvatarMenu = ({
  name,
  userType,
  src,
  roleName,
  showName = true,
  showChangePassword = false,
  showProfile = false,
  onLogout,
  onChangePassword,
  onClickProfile,
}: AvatarMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        className="avatar-menu__btn"
        aria-controls={open ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          src={src || require('../../assets/img/avatar.png')}
          className="avatar-menu__avatar--fe"
        />
        {/* <div className="avatar-menu__account">
          <div className="avatar-menu__account--name">{name}</div>
          <div className="avatar-menu__account--type">{roleName}</div>
        </div> */}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="avatar-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          className: "avatar-menu__paper",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {showName && (
          <MenuItem disabled className="avatar-menu__name">
            {name}
          </MenuItem>
        )}
        {showName && <Divider />}

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
  );
};

export default AvatarMenu;
