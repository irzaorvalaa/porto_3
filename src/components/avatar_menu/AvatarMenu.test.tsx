import * as React from 'react'
import { render } from '@testing-library/react'
import AvatarMenu from './AvatarMenu'

test('renders without crash', () => {
  render(<AvatarMenu name="nujuna" />)
})
