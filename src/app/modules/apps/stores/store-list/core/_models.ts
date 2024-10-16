import {ID, Response} from '../../../../../../_metronic/helpers'

export type Store = {
  id?: ID,
  store_code?: string
  store_name?: string
  address?: string
  dc_id?: number
  is_active?: boolean
}

export type StoreQueryResponse = Response<Array<Store>>

export const initialStore: Store = {
  id: 0,
  store_code:"",
  store_name:"",
  address:"",
  dc_id:0,
  is_active:true
}

export type ListDC = {
  dc_id?: ID,
  dc_name?: string
}

export type ListDCQueryResponse = Response<Array<ListDC>>