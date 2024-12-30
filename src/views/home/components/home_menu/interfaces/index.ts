export declare interface IHomeMenuProps {
  onClick?: (menu: IHomeMenu) => void
}

export declare interface IHomeMenu {
  type: IHomeMenuType
  label: string
}

export type IHomeMenuType =
  | 'favorite'
  | 'ebook'
  | 'catalog'
  | 'journal'
  | 'emagazine'
  | 'multimedia'
