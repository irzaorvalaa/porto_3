import * as React from 'react'
import { render } from '@testing-library/react'
import ProductDelete from './ProductDelete'

const Component = () => <ProductDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
