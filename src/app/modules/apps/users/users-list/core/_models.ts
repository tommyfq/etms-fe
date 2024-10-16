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
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
    id: 0,
    name: "",
    username: "",
    password: "",
    email: "",
    role_id: 0
}

export type ListRole = {
    role_id?: ID,
    role_name?: string
  }
  
  export type ListRoleQueryResponse = Response<Array<ListRole>>