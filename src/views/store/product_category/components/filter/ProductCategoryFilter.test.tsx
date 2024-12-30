import * as React from 'react'
import { render } from '@testing-library/react'
import ProductCategoryFilter from './ProductCategoryFilter'

test('renders without crash', () => {
  render(<ProductCategoryFilter />)
})
