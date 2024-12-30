import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookExternalDatagrid from './GuestBookExternalDatagrid'

const Component = () => (
  <GuestBookExternalDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
