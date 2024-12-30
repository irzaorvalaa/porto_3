import * as React from 'react'
import { Route } from 'react-router-dom'
import { IRouteConfig } from '../interfaces/IRouteConfig'
import Loading from '../components/loading'

declare interface RouteElementProps {
  element: React.LazyExoticComponent<any>
}

const generateRoutes = (routes: IRouteConfig[]): any => {
  const hasChildren = (route: IRouteConfig): boolean => Object.keys(route).includes('children')

  const RouteElement = (route: RouteElementProps): JSX.Element => (
    <React.Suspense fallback={<Loading />}>
      <route.element />
    </React.Suspense>
  )

  return routes.map((route, index) => {
    if (hasChildren(route)) {
      return (
        <Route
          key={index}
          path={route.path}
          index={route.index}
          element={
            route.element && (
              <RouteElement element={route.element as React.LazyExoticComponent<any>} />
            )
          }
        >
          {generateRoutes(route.children as IRouteConfig[])}
        </Route>
      )
    } else {
      return (
        <Route
          key={index}
          path={route.path}
          index={route.index}
          element={
            route.element && (
              <RouteElement element={route.element as React.LazyExoticComponent<any>} />
            )
          }
        />
      )
    }
  })
}

export default generateRoutes
