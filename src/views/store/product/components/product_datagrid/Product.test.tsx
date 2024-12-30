import * as React from 'react'
import { render } from '@testing-library/react'
import ProductDatagrid from './ProductDatagrid'

const Component = () => <ProductDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
