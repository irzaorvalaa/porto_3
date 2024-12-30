import * as React from 'react'
import { render } from '@testing-library/react'
import TabPanel from './TabPanel'

test('renders without crash', () => {
  render(<TabPanel index={0} value={0} />)
})
