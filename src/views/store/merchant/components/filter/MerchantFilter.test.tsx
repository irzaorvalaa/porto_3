import * as React from 'react'
import { render } from '@testing-library/react'
import MerchantFilter from './MerchantFilter'

test('renders without crash', () => {
  render(<MerchantFilter />)
})
