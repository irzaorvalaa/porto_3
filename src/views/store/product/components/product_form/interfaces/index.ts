import { IDialogFormProps } from '../../../../../../components/dialog_form/interfaces'
import { IFormDataDefault, IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IGeneralFetch } from '../../../../../../interfaces/IGeneralFetch'
import { IProduct, IProductDDC, IProductDetail, IProductPublisher } from '../../../interfaces'

export interface IProductFormProps extends IDialogFormProps {
  collectionTypeOptions?: IGeneralFetch[]
  defaultValue?: IProduct | null
  onConfirm?: (values: IProductFormData) => void
  onOpen?: (collection: IProduct | null, cb: IProductFormOpenCallback) => void
}

export interface IProductFormData extends IFormDataDefault {
  collectionTypeID?: string
  collectionType?: string
  bibli?: string
  title?: string
  ddcid?: string
  panggil1?: string
  panggil2?: string
  topic?: string
  collation?: string
  edition?: string
  price?: string
  priceUnit?: string
  keyword?: string
  isbn?: string
  description?: string
  externalID?: string
  publisherID?: string
  publisherName?: string
  publisherCity?: string
  publicationYear?: string
  publishYear?: string
  collectionSupplementID?: string[]
  collectionSupplement?: string[]
  language?: string
  languageID?: string[]
  authorName?: string[]
  authorList?: IProductFormAuthor[]
  notes?: string
  collectionSubjectID?: string[]
  collectionSubject?: string[]
  courseID?: string[]
  course?: string[]
  courseGroupID?: string[]
  courseGroup?: string[]
  courseStatus?: string[]
  nib?: string[]
  campusID?: string[]
  campus?: string[]
  bookPhysic?: string[]
  collectionBookTypeID?: string[]
  collectionBookType?: string[]
  collectionAquisitionType?: string[]
  mediaType?: string[]
  condition?: string[]
  imageFileName?: string
  imageFIleData?: string
  attachedFileName?: string
  attachedFIleData?: string
}

export interface IProductFormAuthor {
  name: string
}

export interface IProductFormCourseData {
  id: string
  course: string
  gugusMatkul: string
  status: IFormDataOption
}

export interface IProductFormDetailData {
  id: string
  nib: string
  campus: IGeneralFetch
  bookPhysic: string
  collectionBookType: IGeneralFetch
  collectionAquisitionType: string
  mediaType: string
  condition: string
  dateIn: string
}

export type IProductFormOpenCallback = (
  DDCOptions: IProductDDC[] | null,
  publisherOptions: IProductPublisher[] | null,
  supplementOptions: IGeneralFetch[] | null,
  subjectOptions: IGeneralFetch[] | null,
  campusOptions: IGeneralFetch[] | null,
  bookTypeOptions: IGeneralFetch[] | null,
  detailCollection: IProductDetail | null,
  error?: string,
) => void
