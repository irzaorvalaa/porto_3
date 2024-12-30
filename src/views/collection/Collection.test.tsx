import * as React from 'react'
import { render } from '@testing-library/react'
import Collection from './Collection'

test('renders without crash', () => {
  render(<Collection />)
})
