import * as React from 'react'
import { render } from '@testing-library/react'
import MappingProductForm from './MappingProductForm'

const Component = () => <MappingProductForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
