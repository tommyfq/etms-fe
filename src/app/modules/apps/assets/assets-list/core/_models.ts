
import {ID, Response} from '../../../../../../_metronic/helpers'
export type Asset = {
  id?: ID
  serial_number?: string
  brand?: string
  item_id?: number
  dc_id?: number
  store_id?: number
  is_active?: boolean
  warranty_status?: boolean
  delivery_date?: string
  warranty_expired?: string
  dc_name?: string, 
  store_name?: string
}

export type AssetQueryResponse = Response<Array<Asset>>

export const initialAsset: Asset = {
  id: 0,
  serial_number: "",
  dc_id: 0,
  store_id: 0,
  is_active: true,
  warranty_status: false,
  delivery_date: "",
  warranty_expired: "",
  dc_name: "",
  store_name: "",
  item_id: 0
}

export type AssetLog = {
  ticket_id?: ID,
  ticket_no?: string,
  complain_at?: string
  diagnostic_name?: string
  part_name?: string
  serial_number?: string
  status?: string
}

export type AssetLogQueryResponse = Response<Array<AssetLog>>

export type ListDC = {
  dc_id?: number,
  dc_name?: string
}

export type ListDCQueryResponse = Response<Array<ListDC>>

export type ListStore = {
    store_id?: number,
    store_name?: string
  }
  
export type ListStoreQueryResponse = Response<Array<ListStore>>

export type ListBrandQueryResponse = Response<Array<string>>

export type ListModel = {
  item_id?: number,
  model?: string
}

export type ListModelQueryResponse = Response<Array<ListModel>>
