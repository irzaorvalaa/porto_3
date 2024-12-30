import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface IProduct {
  id: string
  bibli: string
  collectionType: string
  title: string
  publisher: string | null
  subject: IProductSubject[]
  author: IProductAuthor[]
  cataloger: string | null
  lastModifiedDate: string | null
  lastModifiedBy: string | null
}

export interface IProductDetail extends IProduct {
  collectionImgUrl: string | null
  attachedFile: string | null
  collectionTypeID: string
  ddc: string | null
  generalData: IProductGeneralData
  publisherAssignation: IProductPublisherAssignation
  externalID: string
  keyword: string
  isbn: string | null
  description: string
  supplementAssignation: string | null
  languageAssignation: IProductLanguageAssignation[]
  notes: string | null
  courseAssignation: IProductCourseAssignation[]
  bookData: IProductBookData[]
}

export interface IProductSubject {
  collectionSubjectId: string
  collectionSubject: string
}

export interface IProductAuthor {
  name: string
}

export interface IProductDDC {
  id: string
  label: string
  topic: string
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface IProductPublisher {
  id: string
  name: string
  city: string
  phoneNumber: string
  email: string
  lastModifiedDate: string
  lastModifiedBy: string
}

export interface IProductGeneralData {
  collation: string
  edition: string
  price: number
  priceUnit: string
}

export interface IProductPublisherAssignation {
  publisherId: string
  name: string
  city: string
  publicationYear: string
  publishYear: string
}

export interface IProductLanguageAssignation {
  languageId: string
}

export interface IProductCourseAssignation {
  courseId: string
  course: string
  courseGroupId: string
  courseGroup: string
  status: string | null
}

export interface IProductBookData {
  nib: string
  campusId: string
  campusName: string
  dateIn: string
  bookPhysic: string
  collectionBookTypeID: string
  collectionBookType: string
  collectionAquisitionType: string
  mediaType: string
  condition: string
}

export interface IProductResponse extends IDefaultResponse {
  data: IProduct[]
}

export interface IProductDetailResponse extends IDefaultResponse {
  data: IProductDetail | null
}

export interface IProductDDCResponse extends IDefaultResponse {
  data: IProductDDC[]
}

export interface IProductPublisherResponse extends IDefaultResponse {
  data: IProductPublisher[]
}

export interface IProductState extends ILocalState {
  data: IProduct[]
}

export interface IProductDetailState extends ILocalState {
  data: IProductDetail | null
}

export interface IProductDDCState extends ILocalState {
  data: IProductDDC[]
}

export interface IProductPublisherState extends ILocalState {
  data: IProductPublisher[]
}

export interface IProductFormState extends ILocalState {
  data: IProduct | null
}
