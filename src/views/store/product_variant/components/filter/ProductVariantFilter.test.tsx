import * as React from 'react'
import { render } from '@testing-library/react'
import ProductVariantFilter from './ProductVariantFilter'

test('renders without crash', () => {
  render(<ProductVariantFilter />)
})
