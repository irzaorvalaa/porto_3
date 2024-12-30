import * as React from 'react'
import { render } from '@testing-library/react'
import ProductFilter from './ProductFilter'

test('renders without crash', () => {
  render(<ProductFilter />)
})
