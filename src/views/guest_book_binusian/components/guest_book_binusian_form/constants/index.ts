import * as yup from 'yup'
import { IGuestBookBinusianFormData } from '../interfaces'

export const guestBookBinusianSchema = yup.object({
  memberCode: yup.string().required().label('Member Code'),
  name: yup.string().required().label('Name'),
  lockerNumber: yup
  .string()
  .when('isBorrowLocker', {
    is: (val: string) => val === 'T',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  })
  .label('Locker Number'),
  isBorrowLocker: yup
    .string()
    .nullable()
    .label('Do you wish to borrow Locker?'),
})

export const initialGuestBookBinusianFormdata: IGuestBookBinusianFormData = {
  action: 'Add',
  id: '',
  binusianId: '',
  memberCode: '',
  campusId: '',
  campusName: '',
  name: '',
  email: '',
  isLecturer: '',
  sourceCampusId: '',
  sourceCampusName: '',
  academicGroup: '',
  academicGroupDesc: '',
  academicOrganization: '',
  academicOrganizationDesc: '',
  academicProgram: '',
  academicProgramDesc: '',
  isBorrowLocker: 'F',
  lockerNumber: '',
}
