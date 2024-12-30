import * as React from 'react'
import { render } from '@testing-library/react'
import MerchantDatagrid from './MerchantDatagrid'

const Component = () => <MerchantDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
