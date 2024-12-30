import * as React from 'react'
import { render } from '@testing-library/react'
import ProductVariantForm from './ProductVariantForm'

const Component = () => <ProductVariantForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
