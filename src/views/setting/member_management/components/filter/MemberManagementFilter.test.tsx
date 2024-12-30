import * as React from 'react'
import { render } from '@testing-library/react'
import MemberManagementFilter from './MemberManagementFilter'

test('renders without crash', () => {
  render(<MemberManagementFilter />)
})
