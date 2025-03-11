import {ID, Response} from '../../../../../../_metronic/helpers'
export type CaseCategory = {
  id?: ID
  case_category?: string
  is_active?: boolean
}

export type CaseCategoryQueryResponse = Response<Array<CaseCategory>>

export const initialCaseCategory: CaseCategory = {
  id: 0,
  case_category: "",
  is_active: true
}