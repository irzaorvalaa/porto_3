import * as React from 'react'
import { render } from '@testing-library/react'
import BTSPeriodDelete from './BTSPeriodDelete'

const Component = () => <BTSPeriodDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
