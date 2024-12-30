import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { Store, Persistor } from './App.store'
import { theme } from '../config/ThemeConfig'
import AppRoutes from '../components/app_routes'
import '../scss/App.scss'

// MSAL imports
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from '../config/AuthConfig'
import { SnackbarProvider } from 'notistack'

export const msalInstance = new PublicClientApplication(msalConfig)

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            <MsalProvider instance={msalInstance}>
              <BrowserRouter>
                <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
                  <AppRoutes />
                </SnackbarProvider>
              </BrowserRouter>
            </MsalProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
