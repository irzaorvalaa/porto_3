import * as React from 'react'
import { Divider, List, Toolbar } from '@mui/material'
import PerfectScrollbar from 'perfect-scrollbar'
import { ReactComponent as LogoBinus } from '../../assets/svg/logo-LKC-white.svg'
import './Drawer.scss'
import MenuItem from '../menu_item'
import { IRouteConfig } from '../../interfaces/IRouteConfig'
import { useAppSelector } from '../../helpers'
import { RootState } from '../../bootstrap/App.reducers'
import { IAuthMenu } from '../../interfaces/IAuth'
import { URL_ADMIN } from '../../constants/Parameter'
import routerDashboard from '../../views/dashboard/Dashboard.router'
import { routesConfig } from '../../config/RoutesBEConfig'

const Drawer = () => {
  const drawerListRef = React.useRef<HTMLDivElement>(null)

  // State
  const { user } = useAppSelector((state: RootState) => state.auth)
  const [routes, setRoutes] = React.useState<IRouteConfig[]>([])

  React.useLayoutEffect(() => {
    const ps = new PerfectScrollbar(drawerListRef.current as Element, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20,
    })
    ps.update()

    return () => {
      ps.destroy()
    }
  }, [])

  React.useEffect(() => {
    // Prepare menu
    const authMenu: IAuthMenu[] = user ? (user.defaultAssignedMenu as IAuthMenu[]) : []
    const parentMenu: IAuthMenu[] = authMenu ? authMenu.filter((menu) => !menu.parentID) : []
    const childMenu: IAuthMenu[] = authMenu ? authMenu.filter((menu) => menu.parentID) : []
    const hasChild = (menuID: string): boolean =>
      childMenu.filter((child) => child.parentID === menuID).length > 0
    const menus: IRouteConfig[] = parentMenu.map((menu) => {
      return {
        path: URL_ADMIN.concat(menu.menuUrl),
        key: menu.menuID,
        name: menu.name,
        ...(hasChild(menu.menuID)
          ? {
              children: childMenu
                .filter((child) => child.parentID === menu.menuID)
                .map((child) => {
                  return {
                    path: URL_ADMIN.concat(child.menuUrl),
                    key: child.menuID,
                    name: child.name,
                  }
                }),
            }
          : {}),
      }
    })

    const _routes: IRouteConfig[] = [...routerDashboard, ...menus]

    setRoutes(_routes)
  }, [])

  return (
    <>
      <Toolbar className="drawer-toolbar">
        <LogoBinus className="drawer-toolbar__logo" />
      </Toolbar>
      <Divider />
      <div className="drawer-list" ref={drawerListRef}>
        <List>
          {routesConfig.map((route: any, index: any) => (
            <MenuItem key={index} route={route} childs={route.children} />
          ))}
        </List>
      </div>
    </>
  )
}

export default Drawer
