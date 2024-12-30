import React from 'react'
import { Dialog, Divider, Stack } from '@mui/material'
import './Tracking.scss'

type Props = {
  openTracking: any
  handleCloseTracking: any
}
const Tracking = ({ openTracking, handleCloseTracking }: Props) => {
  return (
    <Dialog open={openTracking} onClose={handleCloseTracking} fullWidth>
      <div className="tracking">
        <Stack direction="row" gap={3}>
          <div className="tracking__left">
            <h1 className="tracking__left--title"> Transaction Details</h1>
            <Divider className="mb-5" />
            <div className="tracking__left--detail">
              <div className="tracking__left--detail__first">
                <div className="tracking__left--detail__first--txt">
                  <h1>Couriers</h1>
                  <h1>SICEPAT</h1>
                </div>
                <div className="tracking__left--detail__first--txt">
                  <h1>Receivers</h1>
                  <h1>RIFIQ</h1>
                </div>
                <div className="tracking__left--detail__first--txt">
                  <h1>Category</h1>
                  <h1>Book</h1>
                </div>
                <Divider className="my-5" />
                <div className="tracking__left--detail__first--txt">
                  <h1>Resi Number</h1>
                  <h1>0213123123</h1>
                </div>
                <Divider className="my-5" />
                <div className="tracking__left--detail__first--txt">
                  <h1>Transaction No.</h1>
                  <h1>B2131231231</h1>
                </div>
                <div className="tracking__left--detail__first--txt my-5">
                  <h1>From</h1>
                  <h1>WAKWAK</h1>
                </div>
                <div className="tracking__left--detail__first--txt">
                  <h1>Delivery Address</h1>
                  <h1>Jl.ahmad yani bogor </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="tracking__right">
            <h1>Status : On Delivery</h1>
            <div className="container"></div>
          </div>
        </Stack>
      </div>
    </Dialog>
  )
}

export default Tracking
