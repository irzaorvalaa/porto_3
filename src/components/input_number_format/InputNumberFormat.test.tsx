import * as React from 'react'
import { render } from '@testing-library/react'
import InputNumberFormat from './InputNumberFormat'

const Component = () => <InputNumberFormat onChange={() => {}} name="Name" />

test('renders without crash', () => {
  render(<Component />)
})
