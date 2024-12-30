import * as React from 'react'
import { render } from '@testing-library/react'
import HomeComingSoon from './HomeComingSoon'

test('renders without crash', () => {
  render(<HomeComingSoon open={false} />)
})
