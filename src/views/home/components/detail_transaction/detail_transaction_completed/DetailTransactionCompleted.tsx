import React from 'react'
import Stack from '@mui/material/Stack'
import './DetailTransactionCompleted.scss'
import Button from '@mui/material/Button'

const DetailTransactionCompleted = () => {
  return (
    <div>
      <div className="transaction-completed__title">Transaction Details</div>
      <div className="transaction-completed__line"></div>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__ordernumber">SP210600014</div>
        <div className="transaction-completed__orderstatus">Completed</div>
      </Stack>
      <div className="transaction-completed__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__invoice">Invoice No.</div>
        <div className="transaction-completed__invoicenumber">INV/20220909/MPL/2642268635</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__purchasedate">Purchase Date</div>
        <div className="transaction-completed__datepurchase">19 September 2022, 13:30 WIB</div>
      </Stack>

      <div className="transaction-completed__linebottom"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__mintitle">Textbook</div>
        <div className="transaction-completed__downloadreceipt">
          {' '}
          <Button variant="text">Download Receipt</Button>
        </div>
      </Stack>

      <div className="transaction-completed__card">
        <div className="transaction-completed__cardtitle">
          BEEHIVE BINUS x Hobbinity Notes Binus - Merchandise 1
        </div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-completed__qty">Quantity : 1</div>
          <div className="transaction-completed__total">Total</div>
        </Stack>
        <div className="transaction-completed__price">Rp.80.000</div>
      </div>
      <div className="transaction-completed__mintitle">Merchandise</div>
      <div className="transaction-completed__card">
        <div className="transaction-completed__cardtitle">
          BEEHIVE Brave Star Travel Tumbler Binus Merchandise - Black 1
        </div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-completed__qty">Quantity : 1</div>
          <div className="transaction-completed__total">Total</div>
        </Stack>
        <div className="transaction-completed__price">Rp50.000</div>
      </div>

      <div className="transaction-completed__mintitle">T-Shirt</div>
      <div className="transaction-completed__card">
        <div className="transaction-completed__cardtitle">
          BEEHIVE BINUS Binusian Sweater Hoodie Unisex - Grey L 2
        </div>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
          <div className="transaction-completed__qty">Quantity : 1</div>
          <div className="transaction-completed__total">Total</div>
        </Stack>
        <div className="transaction-completed__price">Rp120.000</div>
      </div>
      <div className="transaction-completed__linebottom"></div>

      <div className="transaction-completed__mintitle">Delivery Information</div>
      <div className="transaction-completed__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__couriername">Courier</div>
        <div className="transaction-completed__courier">Sicepat</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__resi">Resi Number</div>
        <div className="transaction-completed__resinumber">0219292930292</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__address">Address</div>
        <div className="transaction-completed__addressname">Reza Eka Alfarisi</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__addressdetail">
          0812 3456 7892 Jl. Cikoneng, BCD (Bumi Cikoneng Damai) Residence, Blok A No.3 RT 02 RW 13,
          Lengkong, Bojongsoang, Bandung, Jawa Barat 40288
        </div>
      </Stack>
      <div className="transaction-completed__linebottom"></div>
      <div className="transaction-completed__mintitle">Payment Details</div>
      <div className="transaction-completed__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__method">Payment Method</div>
        <div className="transaction-completed__methodpayment">BCA Virtual Account</div>
      </Stack>

      <div className="transaction-completed__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__subtotal">Sub Total</div>
        <div className="transaction-completed__subtotalprice">Rp250.000</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__totaldisc">Total Disc</div>
        <div className="transaction-completed__totaldiscprice">-Rp80.000</div>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__disc-ongkir">Total Disc Ongkir</div>
        <div className="transaction-completed__disc-ongkir-price">-Rp10.000</div>
      </Stack>
      <div className="transaction-completed__linepayment"></div>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 10, sm: 10, md: 4 }}>
        <div className="transaction-completed__totalpayment">Total Payment</div>
        <div className="transaction-completed__totalpaymentprice">Rp240.000</div>
      </Stack>
      <div className="transaction-completed__buttonreceipt">
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
  )
}

export default DetailTransactionCompleted
