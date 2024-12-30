import * as React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import { initialAuthState } from '../../constants/AuthState'
import Drawer from './Drawer'

const mockStore = configureMockStore()
const store = mockStore({ auth: initialAuthState })

const Component = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Drawer />
    </BrowserRouter>
  </Provider>
)

test('renders without crash', () => {
  render(<Component />)
})
