import * as React from 'react'
import { render } from '@testing-library/react'
import NewsForm from './NewsForm'

const Component = () => <NewsForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
