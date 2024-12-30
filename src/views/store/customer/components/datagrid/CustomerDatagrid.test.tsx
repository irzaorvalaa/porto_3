import * as React from 'react'
import { render } from '@testing-library/react'
import CustomerDatagrid from './CustomerDatagrid'

const Component = () => <CustomerDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
