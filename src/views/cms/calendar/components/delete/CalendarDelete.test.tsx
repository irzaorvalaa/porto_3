import * as React from 'react'
import { render } from '@testing-library/react'
import CalendarDelete from './CalendarDelete'

const Component = () => <CalendarDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
