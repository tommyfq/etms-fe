import {ID, Response} from '../../../../../../_metronic/helpers'
export type Company = {
  id?: ID
  company_name?: string
  contact_name?: string
  contact_number?: string
  default_agent_id?: number
  is_active?: boolean
}

export type CompaniesQueryResponse = Response<Array<Company>>

export const initialCompany: Company = {
  id: 0,
  company_name: "",
  contact_name: "",
  contact_number: "",
  default_agent_id: 0,
  is_active: true
}

export type ListAgent = {
  id?: ID,
  name?: string
}

export type ListAgentQueryResponse = Response<Array<ListAgent>>