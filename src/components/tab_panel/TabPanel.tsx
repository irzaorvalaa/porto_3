import * as React from 'react'
import { ITabPanelProps } from './interfaces'

const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  )
}

export default TabPanel
