import * as React from 'react'
import { render } from '@testing-library/react'
import RoleManagementDelete from './RoleManagementDelete'

const Component = () => <RoleManagementDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
