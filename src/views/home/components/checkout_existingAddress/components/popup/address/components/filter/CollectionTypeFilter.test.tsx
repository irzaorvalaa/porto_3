import * as React from 'react'
import { render } from '@testing-library/react'
import CollectionTypeFilter from './CollectionTypeFilter'

test('renders without crash', () => {
  render(<CollectionTypeFilter />)
})
