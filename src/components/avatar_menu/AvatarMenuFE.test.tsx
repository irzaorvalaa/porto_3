import * as React from 'react'
import { render } from '@testing-library/react'
import AvatarMenuFE from './AvatarMenuFE'

test('renders without crash', () => {
  render(<AvatarMenuFE name="nujuna" />)
})
