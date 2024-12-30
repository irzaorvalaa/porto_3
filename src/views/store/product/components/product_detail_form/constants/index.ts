import * as yup from 'yup'
import { IProductDetailFormData } from '../interfaces'

export const masterCollectionDetailSchema = yup.object({
  nib: yup.string().required().label('NIB'),
  campus: yup.string().required().label('Campus Location'),
  dateIn: yup.string().required().label('Date In'),
  bookPhysic: yup.string().required().label('Book Physic'),
  collectionBookType: yup.string().required().label('Book Type'),
  collectionAquisitionType: yup.string().required().label('Acquisition Type'),
  mediaType: yup.string().required().label('Media Type'),
  condition: yup.string().required().label('Condition'),
})

export const initialProductDetailFormdata: IProductDetailFormData = {
  action: 'Add',
  id: '',
  nib: '',
  campus: '',
  dateIn: '',
  bookPhysic: '',
  collectionBookType: '',
  collectionAquisitionType: '',
  mediaType: '',
  condition: '',
}
