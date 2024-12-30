import * as React from 'react'
import { render } from '@testing-library/react'
import BookTypeForm from './BookTypeForm'

const Component = () => <BookTypeForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
