import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookBinusianReportDatagrid from './GuestBookBinusianReportDatagrid'

const Component = () => (
  <GuestBookBinusianReportDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
