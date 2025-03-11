import {ID, Response} from '../../../../../../_metronic/helpers'
export type Part = {
  id?: ID
  part_name?: string
  is_active?: boolean
}

export type PartQueryResponse = Response<Array<Part>>

export const initialPart: Part = {
  id: 0,
  part_name: "",
  is_active: true
}