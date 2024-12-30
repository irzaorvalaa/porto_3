/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel, Configuration, RedirectRequest } from '@azure/msal-browser'
import { CLIENT_ID, REDIRECT_URL, TENANT_ID } from '../constants/SecretKey'

// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add 'isEdge' to the if check
const ua = window.navigator.userAgent
const msie = ua.indexOf('MSIE ')
const msie11 = ua.indexOf('Trident/')
const msedge = ua.indexOf('Edge/')
const firefox = ua.indexOf('Firefox')
const isIE = msie > 0 || msie11 > 0
const isEdge = msedge > 0
const isFirefox = firefox > 0 // Only needed if you need to support the redirect flow in Firefox incognito

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: process.env.REACT_APP_REDIRECT_URL || REDIRECT_URL,
    postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URL || REDIRECT_URL,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE || isEdge || isFirefox,
    secureCookies: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }

        switch (level) {
          case LogLevel.Error:
            console.error('msalConfig', message)
            return
          case LogLevel.Info:
            console.info('msalConfig', message)
            return
          case LogLevel.Verbose:
            console.debug('msalConfig', message)
            return
          case LogLevel.Warning:
            console.warn('msalConfig', message)
        }
      },
    },
  },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest: RedirectRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account',
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}
