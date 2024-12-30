export const isLocal = (): boolean => process.env.REACT_APP_ENVIRONMENT === 'local'
export const isDevelopment = (): boolean => process.env.REACT_APP_ENVIRONMENT === 'development'
export const isStaging = (): boolean => process.env.REACT_APP_ENVIRONMENT === 'staging'
export const isProduction = (): boolean => process.env.REACT_APP_ENVIRONMENT === 'production'
