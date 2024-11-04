import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string,
  username?: string
  password?: string
  email?: string
  role_id?: number
  role_name?: string,
  is_active?: boolean
  dcs: number[]
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
    id: 0,
    name: "",
    username: "",
    password: "",
    email: "",
    role_id: 0,
    dcs:[]
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