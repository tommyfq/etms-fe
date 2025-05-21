import {ID, Response} from '../../../../../../_metronic/helpers'

export type Store = {
  id?: ID,
  store_code?: string
  store_name?: string
  address?: string
  dc_id?: number
  dc_name?: string
  is_active?: boolean
}

export type StoreQueryResponse = Response<Array<Store>>

export const initialStore: Store = {
  id: 0,
  store_code:"",
  store_name:"",
  address:"",
  dc_id:0,
  dc_name:"",
  is_active:true
}

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

export type ListStore = {
  store_id?: number,
  store_name?: string
}

export type ListDCStoreByComp = {
  dcs: Array<ListDC>;
  stores: Array<ListStore>;
};

export type ListDCStoreQueryResponse = Response<ListDCStoreByComp>