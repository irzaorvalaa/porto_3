import * as React from 'react'
import { render } from '@testing-library/react'
import RoleManagementDatagrid from './RoleManagementDatagrid'

const Component = () => <RoleManagementDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
