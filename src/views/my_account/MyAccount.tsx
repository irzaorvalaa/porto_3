import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Account from './components/account/Account'
import Address from './components/address/Adress'
import OrderHistory from './components/order_history/OrderHistory'
import Sidebar from './components/sidebar/Sidebar'

const MyAccount = () => {
  const [openAddress, setOpenAddress] = useState(false)
  const handleOpenAddress = () => {
    setOpenAddress(true)
    setOpenAccount(false)
    setOpenOrder(false)
  }

  const [openAccount, setOpenAccount] = useState(false)
  const handleOpenAccount = () => {
    setOpenAccount(true)
    setOpenAddress(false)
    setOpenOrder(false)
  }

  const [openOrder, setOpenOrder] = useState(false)
  const handleOpenOrder = () => {
    setOpenOrder(true)
    setOpenAccount(false)
    setOpenAddress(false)
  }

  return (
    <div className="my-5">
      <Stack direction="row">
        <Sidebar
          handleOpenAddress={handleOpenAddress}
          handleOpenAccount={handleOpenAccount}
          handleOpenOrder={handleOpenOrder}
        />
        <Account openAccount={openAccount} />
        <Address openAddress={openAddress} />
        <OrderHistory openOrder={openOrder} />
      </Stack>
    </div>
  )
}

export default MyAccount
