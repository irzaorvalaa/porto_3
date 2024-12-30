import * as React from 'react'
import { render } from '@testing-library/react'
import ProductCategoryDelete from './ProductCategoryDelete'

const Component = () => <ProductCategoryDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
