import * as React from 'react'
import { render } from '@testing-library/react'
import ModalAlert from './'

test('renders without crash', () => {
  render(<ModalAlert type="success" message="success" />)
})
