import * as React from 'react'
import { render } from '@testing-library/react'
import ProductCourseForm from './ProductCourseForm'

test('renders without crash', () => {
  render(<ProductCourseForm />)
})
