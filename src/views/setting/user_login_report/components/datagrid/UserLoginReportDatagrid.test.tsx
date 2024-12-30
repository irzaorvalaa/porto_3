import * as React from 'react'
import { render } from '@testing-library/react'
import UserLoginReportDatagrid from './UserLoginReportDatagrid'

const Component = () => (
  <UserLoginReportDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
