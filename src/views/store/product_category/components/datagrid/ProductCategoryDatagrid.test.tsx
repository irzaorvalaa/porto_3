import * as React from 'react'
import { render } from '@testing-library/react'
import ProductCategoryDatagrid from './ProductCategoryDatagrid'

const Component = () => <ProductCategoryDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
