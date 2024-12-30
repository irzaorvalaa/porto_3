import * as React from 'react'
import { render } from '@testing-library/react'
import DialogDelete from './DialogDelete'

const Component = () => <DialogDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
