import {ID, Response} from '../../../../../../_metronic/helpers'

export type DC = {
  id?: ID
  dc_code?: string
  dc_name?: string
  address?: string
  company_id?: number
  is_active?: boolean
  company_name?: string,
}

export type DCQueryResponse = Response<Array<DC>>

export const initialDC: DC = {
  id: 0,
  dc_code:"",
  dc_name: "",
  address: "",
  company_id: 0,
  is_active: true,
  company_name: ""
}

export type ListCompany = {
  company_id?: ID,
  company_name?: string
}

export type ListCompanyQueryResponse = Response<Array<ListCompany>>