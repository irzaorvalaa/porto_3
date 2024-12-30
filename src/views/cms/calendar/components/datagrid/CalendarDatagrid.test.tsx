import * as React from 'react'
import { render } from '@testing-library/react'
import CalendarDatagrid from './CalendarDatagrid'

const Component = () => (
  <CalendarDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
