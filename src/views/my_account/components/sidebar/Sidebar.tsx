import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import { Link } from 'react-router-dom'

type Props = {
  handleOpenAddress: any
  handleOpenAccount: any
  handleOpenOrder: any
}
const Sidebar = ({ handleOpenAddress, handleOpenAccount, handleOpenOrder }: Props) => {
  return (
    <Box p={2} sx={{ width: '100%', maxWidth: 300 }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/product-cart">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <div style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleOpenAddress}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Address" />
              </ListItemButton>
            </div>
          </ListItem>
          <ListItem disablePadding>
            <div style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleOpenAccount}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </div>
          </ListItem>
          <ListItem disablePadding>
            <div style={{ textDecoration: 'none', color: 'black' }}>
              <ListItemButton onClick={handleOpenOrder}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Order History" />
              </ListItemButton>
            </div>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}

export default Sidebar
