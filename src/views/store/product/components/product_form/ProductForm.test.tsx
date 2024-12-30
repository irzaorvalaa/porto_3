import * as React from 'react'
import { render } from '@testing-library/react'
import ProductForm from './ProductForm'

const Component = () => <ProductForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
