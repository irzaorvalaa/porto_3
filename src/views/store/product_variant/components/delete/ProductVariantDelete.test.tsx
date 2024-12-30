import * as React from 'react'
import { render } from '@testing-library/react'
import ProductVariantDelete from './ProductVariantDelete'

const Component = () => <ProductVariantDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
