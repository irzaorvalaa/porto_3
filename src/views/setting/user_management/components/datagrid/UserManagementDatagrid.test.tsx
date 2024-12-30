import * as React from 'react'
import { render } from '@testing-library/react'
import UserManagementDatagrid from './UserManagementDatagrid'

const Component = () => <UserManagementDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
