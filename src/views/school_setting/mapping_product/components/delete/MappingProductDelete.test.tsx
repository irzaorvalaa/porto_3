import * as React from 'react'
import { render } from '@testing-library/react'
import MappingProductDelete from './MappingProductDelete'

const Component = () => <MappingProductDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
