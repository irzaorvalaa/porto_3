import { ILocalState } from '../../../../interfaces/ILocalState'
import { IDefaultResponse } from '../../../../interfaces/IResponse'

export interface IGuestBookExternalReport {
  id: string
  entryDate: string
  campusName: string
  identityType: string
  identityNumber: string
  name: string
  email: string | null
  institutionName: string
  phoneNumber: string
  needs: string
}

export declare interface IGuestBookExternalReportResponse extends IDefaultResponse {
  data: IGuestBookExternalReport[]
}

export declare interface IGuestBookExternalReportState extends ILocalState {
  data: IGuestBookExternalReport[]
}
