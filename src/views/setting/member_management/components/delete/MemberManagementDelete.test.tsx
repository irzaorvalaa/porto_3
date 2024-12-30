import * as React from 'react'
import { render } from '@testing-library/react'
import MemberManagementDelete from './MemberManagementDelete'

const Component = () => <MemberManagementDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
