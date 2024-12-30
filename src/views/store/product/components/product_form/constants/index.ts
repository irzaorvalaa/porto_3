import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { IProductFormData } from '../interfaces'

export const masterCollectionSchema = yup.object({
  collectionTypeID: yup.string().required().label('Collection Type'),
  bibli: yup.string().nullable().label('Bibli'),
  title: yup.string().required().label('Title'),
  ddcid: yup.string().nullable().label('DDC'),
  panggil1: yup.string().nullable().label('Call ID 1'),
  panggil2: yup.string().nullable().label('Call ID 2'),
  topic: yup.string().nullable().label('Topic'),
  collation: yup.string().nullable().label('Collation'),
  edition: yup.string().nullable().label('Edition'),
  price: yup.string().required().label('Price'),
  priceUnit: yup.string().default('Rp'),
  keyword: yup.string().required().label('Keyword'),
  isbn: yup.string().nullable().label('ISBN'),
  description: yup.string().nullable().label('Description/Sysnopsis'),
  externalID: yup.string().nullable().default('').label('External ID'),
  publisherID: yup.string().nullable().label('Publisher Code'),
  publisherName: yup.string().nullable().label('Publisher Name'),
  publisherCity: yup.string().nullable().label('Publisher City'),
  publicationYear: yup.string().nullable().label('Publication Year'),
  publishYear: yup.string().nullable().label('Publish Year'),
  language: yup.string().required().label('Language'),
  authorList: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required().label('Author'),
      }),
    )
    .min(1)
    .label('Author'),
  notes: yup.string().default('').label('Notes'),
})

export const initialProductFormdata: IProductFormData = {
  action: 'Add',
  id: '',
  collectionTypeID: '',
  collectionType: '',
  bibli: '',
  title: '',
  ddcid: '',
  panggil1: '',
  panggil2: '',
  topic: '',
  collation: '',
  edition: '',
  price: '0',
  priceUnit: 'Rp',
  keyword: '',
  isbn: '',
  description: '',
  externalID: '',
  publisherID: '',
  publisherName: '',
  publisherCity: '',
  publicationYear: '',
  publishYear: '',
  collectionSupplementID: [],
  collectionSupplement: [],
  language: '',
  languageID: [],
  authorName: [],
  authorList: [{ name: '' }],
  notes: '',
  collectionSubjectID: [],
  collectionSubject: [],
  courseID: [],
  course: [],
  courseGroupID: [],
  courseGroup: [],
  courseStatus: [],
  nib: [],
  campusID: [],
  campus: [],
  bookPhysic: [],
  collectionBookTypeID: [],
  collectionBookType: [],
  collectionAquisitionType: [],
  mediaType: [],
  condition: [],
  imageFileName: '',
  imageFIleData: '',
  attachedFileName: '',
  attachedFIleData: '',
}

export const collectionManagementStatus: IFormDataOption[] = [
  {
    value: 'main',
    label: 'Main Textbook',
  },
  {
    value: 'supporting',
    label: 'Supporting Textbook',
  },
]

export const sampleCollectionManagementCourse: IFormDataOption[] = [
  {
    value: 'course1',
    label: 'Course 1',
  },
  {
    value: 'course2',
    label: 'Course 2',
  },
  {
    value: 'course3',
    label: 'Course 3',
  },
]
