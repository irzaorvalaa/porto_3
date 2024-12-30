import * as React from 'react'
import { render } from '@testing-library/react'
import MappingProductDatagrid from './MappingProductDatagrid'

const Component = () => <MappingProductDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
