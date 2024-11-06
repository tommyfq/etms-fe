import {ID, Response} from '../../../../../../_metronic/helpers'
export type Item = {
  id?: ID
  brand?: string
  model?: string
  warranty_duration?: number,
  is_active?: boolean
}

export type ItemQueryResponse = Response<Array<Item>>

export const initialItem: Item = {
  id: 0,
  brand: "",
  model: "",
  warranty_duration:0,
  is_active: true
}