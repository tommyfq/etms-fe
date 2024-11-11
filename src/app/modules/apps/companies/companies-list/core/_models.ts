import {ID, Response} from '../../../../../../_metronic/helpers'
export type Company = {
  id?: ID
  company_code?: string
  company_name?: string
  contact_name?: string
  contact_number?: string
  is_active?: boolean
}

export type CompaniesQueryResponse = Response<Array<Company>>

export const initialCompany: Company = {
  id: 0,
  company_code: "",
  company_name: "",
  contact_name: "",
  contact_number: "",
  is_active: true
}

export type ListAgent = {
  id?: ID,
  name?: string
}

export type ListAgentQueryResponse = Response<Array<ListAgent>>