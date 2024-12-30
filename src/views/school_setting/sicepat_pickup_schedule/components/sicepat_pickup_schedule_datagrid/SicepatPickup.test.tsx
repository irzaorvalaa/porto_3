import * as React from 'react'
import { render } from '@testing-library/react'
import SicepatPickupDatagrid from './SicepatPickupDatagrid'

const Component = () => <SicepatPickupDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
