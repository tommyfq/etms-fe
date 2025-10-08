import {ID, Response} from '../../../../../../_metronic/helpers'
export type Access = {
  dc_id:number,
  company_id:number
}

export type User = {
  id?: ID
  name?: string,
  username?: string
  password?: string
  email?: string
  role_id?: number
  role_name?: string,
  is_active?: boolean,
  dcs?:number[],
  company_id?:number,
  avatar?:string
}

export type UsersQueryResponse = Response<Array<User>>


export const initialUser: User = {
    id: 0,
    name: "",
    username: "",
    password: "",
    email: "",
    role_id: 0,
    is_active: true,
    dcs:[],
    company_id:0,
    avatar:""
}

export type ListRole = {
    role_id?: ID,
    role_name?: string
  }
  
  export type ListRoleQueryResponse = Response<Array<ListRole>>

  export type ListDC = {
    dc_id?: ID,
    dc_name?: string
  }
  
  export type ListDCQueryResponse = Response<Array<ListDC>>

  export type ListCompany = {
    company_id?: ID,
    company_name?: string
  }
  
  export type ListCompanyQueryResponse = Response<Array<ListCompany>>