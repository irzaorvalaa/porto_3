import * as React from 'react'
import { render } from '@testing-library/react'
import BookTypeDelete from './BookTypeDelete'

const Component = () => <BookTypeDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
