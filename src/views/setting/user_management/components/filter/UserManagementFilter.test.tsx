import * as React from 'react'
import { render } from '@testing-library/react'
import UserManagementFilter from './UserManagementFilter'

test('renders without crash', () => {
  render(<UserManagementFilter />)
})
