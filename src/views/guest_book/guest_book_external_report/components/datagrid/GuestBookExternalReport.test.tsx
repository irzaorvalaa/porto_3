import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookExternalReportDatagrid from './GuestBookExternalReportDatagrid'

const Component = () => (
  <GuestBookExternalReportDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
