import * as React from 'react'
import { render } from '@testing-library/react'
import BTSPeriodDatagrid from './BTSPeriodDatagrid'

const Component = () => <BTSPeriodDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
