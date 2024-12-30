import * as React from 'react'
import { render } from '@testing-library/react'
import DetailLoginAlert from './DetailLoginAlert'

test('renders without crash', () => {
  render(<DetailLoginAlert open={false} />)
})
