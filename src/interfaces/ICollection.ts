import { ILocalState } from './ILocalState'
import { IDefaultResponse } from './IResponse'

export interface ICollection {
  id: string
  collectionImgUrl: string
  title: string
  collectionTypeID: string
  collectionType: string
  publishDate: string
}

export interface ICollectionDetail extends ICollection {
  keyword: string
  description: string
  isDigital: boolean
  publisherID: string
  publisher: string
  publicationYear: string
  edition: string
  externalID: string
  bibli: string
  isbn: string
  attachedFile: string
  ltiLaunchUrl: string
  notes: string
  sharedUsername: string
  sharedPassword: string
  subject: ICollectionSubject[]
  author: ICollectionAuthor[]
  stockInCampus: ICollectionStock[]
}

export interface ICollectionSubject {
  id: string
  subject: string
}

export interface ICollectionAuthor {
  name: string
}

export interface ICollectionStock {
  campusName: string
  total: number
}

export interface ICollectionResponse extends IDefaultResponse {
  data: ICollection[]
}

export interface ICollectionState extends ILocalState {
  data: ICollection[]
}

export interface ICollectionDetailResponse extends IDefaultResponse {
  data: ICollectionDetail | null
}

export interface ICollectionDetailState extends ILocalState {
  data: ICollectionDetail | null
}
