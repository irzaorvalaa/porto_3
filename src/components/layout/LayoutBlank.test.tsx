import * as React from 'react'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { msalConfig } from '../../config/AuthConfig'
import { initialAuthState } from '../../constants/AuthState'
import Layout from './'

export const msalInstance = new PublicClientApplication(msalConfig)

const mockStore = configureMockStore()
const store = mockStore({ auth: initialAuthState })

const Component = () => (
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </MsalProvider>
  </Provider>
)

test('renders without crash', async () => {
  const promise = Promise.resolve()

  render(<Component />)

  await act(async () => {
    await promise
  })
})
