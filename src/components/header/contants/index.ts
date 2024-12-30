import { IHeaderMenu } from '../interfaces'

const headerMenus: IHeaderMenu[] = [
  {
    title: 'Home',
    url: '/',
    isLink: true,
    key: 'home',
  },
  {
    title: 'Talk To Us',
    url: '/talk-to-us',
    isLink: false,
    key: 'talkToUs',
  },
]

export { headerMenus }
