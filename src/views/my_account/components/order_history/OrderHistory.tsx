import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import order from '../../../../assets/data/order.json'
import DetailTransaction from './components/detail_transaction/DetailTransaction'
import Tracking from './components/tracking/Tracking'
import './OrderHistory.scss'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import statusOrder from '../../../../assets/data/status_order.json'

import DateRangePicker from '@mui/lab/DateRangePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import TabPanel from '../../../../components/tab_panel'

type Props = {
  openOrder: any
}
const OrderHistory = ({ openOrder }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [openTracking, setOpenTracking] = useState(false)
  const handleOpenTracking = () => {
    setOpenTracking(true)
  }
  const handleCloseTracking = () => {
    setOpenTracking(false)
  }

  const [startDate, setStartDate] = React.useState<null | Date>(null)
  const [age, setAge] = React.useState('')
  const [tabs, setTabs] = React.useState<number>(0)

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <div>
      {openOrder ? (
        <div className="order-history">
          <div className="order-history__input">
            <Stack direction="row" gap={3}>
              <Box className="order-history__input--1">
                <TextField
                  label="With normal TextField"
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box className="order-history__input--2">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Basic example"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box className="order-history__input--3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </div>
          <div className="order-history__status">
            <Tabs
              variant="scrollable"
              textColor="inherit"
              value={tabs}
              onChange={(_, newValue) => handleChange(newValue)}
            >
              {statusOrder.map((status, index) => (
                <Tab key={index} label={status.statusOrder} />
              ))}
            </Tabs>
          </div>
          {statusOrder.map((_, index) => (
            <TabPanel key={index} value={tabs} index={index} id={`order-tabpanel-${index}`}>
              {order.map((item) => (
                <div key={item.id} className="mx-4">
                  <div className="order-history__identity">
                    <h1>
                      {item.name} - {item.orderID} - {item.orderDate}
                    </h1>
                  </div>
                  <div className="order-history__card">
                    <div className="order-history__card--items">
                      <Stack direction="row" gap={10}>
                        <div className="order-history__card--items__left">
                          <div className="order-history__card--items__left--status">
                            <h1 className="text-red-800">Purchase Date - {item.orderDate}</h1>
                            <h1 className="text-primary-500">{item.orderStatus}</h1>
                          </div>
                          <div className="order-history__card--items__left--first">
                            <h1>{item.productCategory}</h1>
                            <h1 className="text-2xl font-bold">Rp.{item.price}</h1>
                          </div>
                          <div className="order-history__card--items__left--second">
                            <Stack direction="row" gap={3}>
                              <Button onClick={handleOpen}>Lihat Detail Transaksi</Button>
                              <Button onClick={handleOpenTracking}>Tracking</Button>
                            </Stack>
                          </div>
                        </div>
                        <div className="order-history__card--items__right">
                          <h1>Total</h1>
                          <h1 className="font-bold text-2xl">Rp.{item.totalPrice}</h1>
                        </div>
                      </Stack>
                    </div>
                  </div>
                </div>
              ))}
            </TabPanel>
          ))}

          <DetailTransaction open={open} handleClose={handleClose} />
          <Tracking openTracking={openTracking} handleCloseTracking={handleCloseTracking} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default OrderHistory
