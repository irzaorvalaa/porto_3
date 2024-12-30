import { IFooterLocation, IFooterMenu } from '../interfaces'

const footerMenus: IFooterMenu[] = [
  {
    title: 'Terms & Conditions',
    url: '/terms-and-conditions',
  },
  {
    title: 'Privacy Policy',
    url: '/privacy-policy',
  },
  {
    title: 'Contact Us',
    url: '/contact-us',
  },
]

const footerLocations: IFooterLocation[] = [
  {
    value: '1',
    label: 'LKC Alam Sutera Campus',
  },
  {
    value: '2',
    label: 'LKC The Joseph Wibowo Center',
  },
  {
    value: '3',
    label: 'LKC Kijang Campus',
  },
  {
    value: '4',
    label: 'LKC FX Campus',
  },
  {
    value: '5',
    label: 'LKC Bekasi Campus',
  },
]

export { footerMenus, footerLocations }
