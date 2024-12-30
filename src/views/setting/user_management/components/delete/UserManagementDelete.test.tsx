import { render } from '@testing-library/react'
import UserManagementDelete from './UserManagementDelete'

const Component = () => <UserManagementDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
