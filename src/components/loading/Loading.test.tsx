import * as React from 'react'
import { render } from '@testing-library/react'
import Loading from './'

test('renders without crash', () => {
  render(<Loading />)
})
