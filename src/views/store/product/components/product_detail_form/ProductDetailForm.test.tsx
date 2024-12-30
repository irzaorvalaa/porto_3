import * as React from 'react'
import { render } from '@testing-library/react'
import ProductDetailForm from './ProductDetailForm'

test('renders without crash', () => {
  render(<ProductDetailForm />)
})
