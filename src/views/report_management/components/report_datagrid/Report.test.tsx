import * as React from 'react'
import { render } from '@testing-library/react'
import ReportDatagrid from './ReportDatagrid'

const Component = () => <ReportDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
