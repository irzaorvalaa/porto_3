import React from 'react'
import Stack from '@mui/material/Stack'
import './DetailTransactionDelivered.scss'
import Button from '@mui/material/Button'
const DetailTransactionDelivered = () => {
  return (
    <div>
      {' '}
      <div>
        <div className="transaction-delivered__title">Transaction Details</div>
        <div className="transaction-delivered__line"></div>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__ordernumber">SP210600014</div>
          <div className="transaction-delivered__orderstatus">On Delivery</div>
        </Stack>
        <div className="transaction-delivered__linepayment"></div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__invoice">Invoice No.</div>
          <div className="transaction-delivered__invoicenumber">INV/20220909/MPL/2642268635</div>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__purchasedate">Purchase Date</div>
          <div className="transaction-delivered__datepurchase">19 September 2022, 13:30 WIB</div>
        </Stack>

        <div className="transaction-delivered__linebottom"></div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__mintitle">Textbook</div>
          <div className="transaction-delivered__downloadreceipt">
            {' '}
            <Button variant="text">Download Receipt</Button>
          </div>
        </Stack>

        <div className="transaction-delivered__card">
          <div className="transaction-delivered__cardtitle">
            BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
          </div>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
            <div className="transaction-delivered__qty">Quantity : 1</div>
            <div className="transaction-delivered__total">Total</div>
          </Stack>
          <div className="transaction-delivered__price">Rp.80.000</div>
        </div>
        <div className="transaction-delivered__mintitle">Merchandise</div>
        <div className="transaction-delivered__card">
          <div className="transaction-delivered__cardtitle">
            BEEHIVE Brave Star Travel Tumbler Binus Merchandise - Black 1
          </div>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
            <div className="transaction-delivered__qty">Quantity : 1</div>
            <div className="transaction-delivered__total">Total</div>
          </Stack>
          <div className="transaction-delivered__price">Rp50.000</div>
        </div>

        <div className="transaction-delivered__mintitle">T-Shirt</div>
        <div className="transaction-delivered__card">
          <div className="transaction-delivered__cardtitle">
            BEEHIVE BINUS Binusian Sweater Hoodie Unisex - Grey L 2
          </div>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
            <div className="transaction-delivered__qty">Quantity : 1</div>
            <div className="transaction-delivered__total">Total</div>
          </Stack>
          <div className="transaction-delivered__price">Rp120.000</div>
        </div>
        <div className="transaction-delivered__linebottom"></div>

        <div className="transaction-delivered__mintitle">Delivery Information</div>
        <div className="transaction-delivered__linepayment"></div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__couriername">Courier</div>
          <div className="transaction-delivered__courier">Sicepat</div>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__resi">Resi Number</div>
          <div className="transaction-delivered__resinumber">0219292930292</div>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__address">Address</div>
          <div className="transaction-delivered__addressname">Reza Eka Alfarisi</div>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__addressdetail">
            0812 3456 7892 Jl. Cikoneng, BCD (Bumi Cikoneng Damai) Residence, Blok A No.3 RT 02 RW
            13, Lengkong, Bojongsoang, Bandung, Jawa Barat 40288
          </div>
        </Stack>
        <div className="transaction-delivered__linebottom"></div>
        <div className="transaction-delivered__mintitle">Payment Details</div>
        <div className="transaction-delivered__linepayment"></div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__method">Payment Method</div>
          <div className="transaction-delivered__methodpayment">BCA Virtual Account</div>
        </Stack>

        <div className="transaction-delivered__linepayment"></div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__subtotal">Sub Total</div>
          <div className="transaction-delivered__subtotalprice">Rp250.000</div>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__totaldisc">Total Disc</div>
          <div className="transaction-delivered__totaldiscprice">-Rp80.000</div>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__disc-ongkir">Total Disc Ongkir</div>
          <div className="transaction-delivered__disc-ongkir-price">-Rp10.000</div>
        </Stack>
        <div className="transaction-delivered__linepayment"></div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-delivered__totalpayment">Total Payment</div>
          <div className="transaction-delivered__totalpaymentprice">Rp240.000</div>
        </Stack>
        <div className="transaction-delivered__buttonreceipt">
          <Button
            variant="outlined"
            component="label"
            sx={{ height: 50, width: 200, borderRadius: 10 }}
          >
            Download Receipt
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailTransactionDelivered
