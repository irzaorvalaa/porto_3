import * as React from 'react'
import { render } from '@testing-library/react'
import MemberManagementForm from './MemberManagementForm'

const Component = () => <MemberManagementForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
