export declare interface IDefaultResponse<T = any> {
  data: T
  callback: string
  resultCode: number
  errorMessage: string
  status: boolean
  message: string
}

export declare interface IDefaultResponseBE<T = any> {
  id: string
  lastModifiedDate: string
  lastModifiedBy: string
}



export declare interface ICampusAssignation {
  campusId: string
  campusName: string
}

export declare interface IAcademicProgramAssignation {
  academicProgram: string
  academicProgramDesc: string
}

export declare interface IRoleAssignation {
  roleId: string
  roleName: string
}