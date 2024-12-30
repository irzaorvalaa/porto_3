import * as React from 'react'
import { render } from '@testing-library/react'
import MemberManagementDatagrid from './MemberManagementDatagrid'

const Component = () => (
  <MemberManagementDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
