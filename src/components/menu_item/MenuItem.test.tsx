import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { routesConfig as routes } from '../../config/RoutesBEConfig'
import MenuItem from './MenuItem'

const route = routes[0]

const Component = () => (
  <BrowserRouter>
    <MenuItem route={route} />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
