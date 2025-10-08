import {ID, Response} from '../../../../_metronic/helpers'
export type Access = {
  dc_id:number,
  company_id:number
}

export type MyProfile = {
  id?: ID
  name?: string,
  username?: string
  password?: string
  email?: string
  role?: string
  dcs?: string
  company_name?:string,
  avatar?:string,
}

export type MyProfileQueryResponse = Response<Array<MyProfile>>


export const initialMyProfile: MyProfile = {
    id: 0,
    name: "",
    username: "",
    password: "",
    email: "",
    role: "",
    dcs: "",
    company_name: "",
    avatar: "",
}