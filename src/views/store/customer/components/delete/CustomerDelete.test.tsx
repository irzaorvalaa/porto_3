import * as React from 'react'
import { render } from '@testing-library/react'
import CustomerDelete from './CustomerDelete'

const Component = () => <CustomerDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
