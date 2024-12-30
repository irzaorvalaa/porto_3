import React from 'react'
import Stack from '@mui/material/Stack'
import './DetailTransactionWaiting.scss'
import { Link } from 'react-router-dom'
import data from '../../../../../assets/data/data_detail_transaction.json'
import statuspayment from '../../../../../assets/data/data_payment.json'
const DetailTransactionWaiting = () => {
  return (
    <div>
      <div className="transaction-waiting__title">
        Transaction Detail
        <div className="transaction-waiting__line"></div>
        <div>
          {data.map((card, key) => (
            <div className="transaction-waiting__mintitle" key={card.maintitle}>
              {card.maintitle}
              <div className="transaction-waiting__card" key={card.id}>
                <div className="transaction-waiting__cardtitle">{card.title}</div>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
                  <div className="transaction-waiting__qty">Quantity : {card.qty}</div>
                  <div className="transaction-waiting__total">Total</div>
                </Stack>
                <div className="transaction-waiting__price">{card.totalprice}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="transaction-waiting__linebottom"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__mintitle">Payment Details</div>
        <div className="transaction-waiting__waitingpayment" key={statuspayment[0].id}>
          {statuspayment[0].status_payment}
        </div>
      </Stack>
      <div className="transaction-waiting__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__method">Payment Method</div>
        <div className="transaction-waiting__methodpayment">BCA Virtual Account</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__va">Virtual Account Number</div>
        <div className="transaction-waiting__vanumber">8277083648383912</div>
      </Stack>
      <div className="transaction-waiting__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__subtotal">Sub Total</div>
        <div className="transaction-waiting__subtotalprice">Rp250.000</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__totaldisc">Total Disc</div>
        <div className="transaction-waiting__totaldiscprice">-Rp80.000</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__disc-ongkir">Total Disc Ongkir</div>
        <div className="transaction-waiting__disc-ongkir-price">-Rp10.000</div>
      </Stack>
      <div className="transaction-waiting__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-waiting__totalpayment">Total Payment</div>
        <div className="transaction-waiting__totalpaymentprice">Rp240.000</div>
      </Stack>
    </div>
  )
}

export default DetailTransactionWaiting
