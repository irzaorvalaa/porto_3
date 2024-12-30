import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import generateRoutes from '../../utilities/generateRoutes'
import RequireAuth from '../require_auth'
import RequireAuthFE from '../require_auth/RequireAuthFE'
import LoadingFull from '../loading/LoadingFull'
import { URL_ADMIN } from '../../constants/Parameter'

const Layout = React.lazy(() => import('../layout'))
const LayoutFE = React.lazy(() => import('../layout/LayoutFE'))
const LayoutBlank = React.lazy(() => import('../layout/LayoutBlank'))

const AppRoutes = () => {
  const [routesBE, setRoutesBE] = React.useState<any>(null)
  const [routesFE, setRoutesFE] = React.useState<any>(null)
  const [routesLogout, setRoutesLogout] = React.useState<any>(null)
  const [routesLogoutAdmin, setRoutesLogoutAdmin] = React.useState<any>(null)
  const [routesBlank, setRoutesBlank] = React.useState<any>(null)
  const [routePage404, setRoutePage404] = React.useState<any>(null)
  const [routeLoginExternal, setRouteLoginExternal] = React.useState<any>(null)

  React.useEffect(() => {
    import('../../config/RoutesBEConfig').then((value) => {
      const generatedRoutesBE = generateRoutes(value.routesConfig)
      setRoutesBE(generatedRoutesBE)
    })

    import('../../config/RoutesFEConfig').then((value) => {
      const generatedRoutesFE = generateRoutes(value.routesConfig)
      setRoutesFE(generatedRoutesFE)
    })

    import('../../views/logout/Logout.router').then((value) => {
      const generatedRouteLogout = generateRoutes(value.default)
      setRoutesLogout(generatedRouteLogout)
    })

    import('../../views/logout_admin/Logout_admin.router').then((value) => {
      const generatedRouteLogoutAdmin = generateRoutes(value.default)
      setRoutesLogoutAdmin(generatedRouteLogoutAdmin)
    })

    import('../../views/guest_book_binusian/GuestBookBinusian.router').then((value) => {
      const generatedRoutesBlank = generateRoutes(value.default)
      setRoutesBlank(generatedRoutesBlank)
    })

    import('../../views/page404/Page404.router').then((value) => {
      const generatedRoutePage404 = generateRoutes(value.default)
      setRoutePage404(generatedRoutePage404)
    })

    import('../../views/login_external/LoginExternal.router').then((value) => {
      const generatedRouteLoginExternal = generateRoutes(value.default)
      setRouteLoginExternal(generatedRouteLoginExternal)
    })
  }, [])

  return (
    <Routes>
      <Route
        element={
          <React.Suspense fallback={<LoadingFull isFullscreen />}>
            <LayoutFE />
          </React.Suspense>
        }
      >
        {routesFE}
      </Route>
      <Route
        path={URL_ADMIN}
        element={
          <RequireAuth>
            <React.Suspense fallback={<LoadingFull isFullscreen />}>
              <Layout />
            </React.Suspense>
          </RequireAuth>
        }
      >
        {routesBE}
      </Route>
      <Route
        element={
          <RequireAuth>
            <React.Suspense fallback={<LoadingFull isFullscreen />}>
              <LayoutBlank />
            </React.Suspense>
          </RequireAuth>
        }
      >
        {routesBlank}
      </Route>
      {routeLoginExternal}
      {routesLogout}
      {routesLogoutAdmin}
      {routePage404}
    </Routes>
  )
}

export default AppRoutes
