import * as React from 'react'

export declare interface IRouteConfig {
  path: string
  name?: string
  index?: boolean | false
  element?: React.LazyExoticComponent<any> | null
  children?: IRouteConfig[]
  key?: string
}
