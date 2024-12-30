import * as yup from 'yup'
import { IFormDataOption } from '../../../../../../interfaces/IFormData'
import { ICampusFormData } from '../interfaces'

export const campusSchema = yup.object({
  id: yup.string().required().label('Campus ID'),
  name: yup.string().required().label('Campus Name'),
  email: yup.string().email().label('Campus Email'),
  phoneNumberWA: yup.string().nullable().label('Phone Number (WA)'),
  phoneNumberExt: yup.string().nullable().label('Phone Number (Ext)'),
  address: yup.string().required().label('Address'),
  provideLockerBorrowing: yup
    .string()
    .oneOf(['T', 'F'], 'Provide Locker Borrowing is a required field')
    .label('Provide Locker Borrowing'),
  serviceHour: yup
    .array()
    .of(
      yup.object({
        day: yup.string().required().label('Service Day'),
        hourStart: yup.string().required().label('Service Hour Start Time'),
        hourEnd: yup.string().required().label('Service Hour End Time'),
      }),
    )
    .min(1)
    .label('Service Hour'),
  pic: yup
    .array()
    .of(
      yup.object({
        binusianID: yup.string().required().label('PIC Binusian ID'),
        // name: yup.string().required().label('PIC Name'),
        // email: yup.string().required().label('PIC Email'),
      }),
    )
    .min(1)
    .label('PIC'),
})

export const initialCampusFormdata: ICampusFormData = {
  action: 'Add',
  id: '',
  fileName: '',
  fileData: '',
  name: '',
  phoneNumberExt: '',
  phoneNumberWA: '',
  email: '',
  serviceDay: [],
  serviceHourStart: [],
  serviceHourEnd: [],
  serviceHour: [{ day: '', hourStart: '', hourEnd: '' }],
  picUserID: [],
  picName: [],
  picEmail: [],
  pic: [{ userID: '', binusianID: '', name: '', email: '' }],
  address: '',
  provideLockerBorrowing: '',
}

export const campusDayOptions: IFormDataOption[] = [
  {
    value: 'Sunday',
    label: 'Sunday',
  },
  {
    value: 'Monday',
    label: 'Monday',
  },
  {
    value: 'Tuesday',
    label: 'Tuesday',
  },
  {
    value: 'Wednesday',
    label: 'Wednesday',
  },
  {
    value: 'Thursday',
    label: 'Thursday',
  },
  {
    value: 'Friday',
    label: 'Friday',
  },
  {
    value: 'Saturday',
    label: 'Saturday',
  },
]

export const campusProvideLockerOptions: IFormDataOption[] = [
  {
    value: 'T',
    label: 'Yes',
  },
  {
    value: 'F',
    label: 'No',
  },
]
