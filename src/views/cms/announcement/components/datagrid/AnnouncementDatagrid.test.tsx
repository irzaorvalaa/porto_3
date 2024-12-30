import * as React from 'react'
import { render } from '@testing-library/react'
import AnnouncementDatagrid from './AnnouncementDatagrid'

const Component = () => (
  <AnnouncementDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
