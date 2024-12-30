import * as React from 'react'
import { render } from '@testing-library/react'
import ProductCategoryForm from './ProductCategoryForm'

const Component = () => <ProductCategoryForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
