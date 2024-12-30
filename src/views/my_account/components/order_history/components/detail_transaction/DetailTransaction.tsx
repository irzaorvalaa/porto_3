import React from 'react'
import Stack from '@mui/material/Stack'
import './DetailTransaction.scss'
import { Link } from 'react-router-dom'
import data from '../../../../../../assets/data/data_detail_transaction.json'
import statuspayment from '../../../../../../assets/data/data_payment.json'
import { Dialog, Divider } from '@mui/material'

type Props = {
  open: any
  handleClose: any
}
const DetailTransaction = ({ open, handleClose }: Props) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="detail-transaction">
        <div className="detail-transaction__top">
          <div className="detail-transaction__top--title">
            <h1>Transaction Detail</h1>
          </div>
          <Divider className="mb-4" />

          {data.map((card, key) => (
            <div className="detail-transaction__top--container" key={card.id}>
              <h1 className="detail-transaction__top--container__category">{card.maintitle}</h1>
              <div className="detail-transaction__top--container__card">
                <div className="detail-transaction__top--container__card--img">
                  <img src={card.image} alt="" />
                </div>
                <div className="detail-transaction__top--container__card--txt">
                  <div className="detail-transaction__top--container__card--txt__title">
                    {card.title}
                  </div>
                  <div className="detail-transaction__top--container__card--txt__qty">
                    Quantity : {card.qty}
                  </div>
                </div>
                <div className="detail-transaction__top--container__card--total">
                  <h1 className="detail-transaction__top--container__card--total__txt">Total</h1>
                  <h1 className="detail-transaction__top--container__card--total__price">
                    {card.totalprice}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="detail-transaction__bottom">
          <div className="detail-transaction__bottom--status">
            <div className="detail-transaction__bottom--status__txt font-bold">Payment Details</div>
            <div
              className="detail-transaction__bottom--status__status text-red-600 font-bold"
              key={statuspayment[0].id}
            >
              {statuspayment[0].status_payment}
            </div>
          </div>
          <Divider className="mb-3" />

          <div className="detail-transaction__bottom--status">
            <div className="transaction-waiting__method">Payment Method</div>
            <div className="transaction-waiting__methodpayment">BCA Virtual Account</div>
          </div>

          <div className="detail-transaction__bottom--status">
            <div className="transaction-waiting__va">Virtual Account Number</div>
            <div className="transaction-waiting__vanumber font-bold">8277083648383912</div>
          </div>
          <Divider />
          <div className="detail-transaction__bottom--status">
            <div className="transaction-waiting__subtotal">Sub Total</div>
            <div className="transaction-waiting__subtotalprice">Rp250.000</div>
          </div>

          <div className="detail-transaction__bottom--status">
            <div className="transaction-waiting__totaldisc">Total Disc</div>
            <div className="transaction-waiting__totaldiscprice">-Rp80.000</div>
          </div>

          <div className="detail-transaction__bottom--status">
            <div className="transaction-waiting__disc-ongkir">Total Disc Ongkir</div>
            <div className="transaction-waiting__disc-ongkir-price">-Rp10.000</div>
          </div>
          <Divider />
          <div className="detail-transaction__bottom--status">
            <div className="transaction-waiting__totalpayment font-bold">Total Payment</div>
            <div className="transaction-waiting__totalpaymentprice font-bold">Rp240.000</div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DetailTransaction
