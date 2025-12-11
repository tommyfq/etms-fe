import {ID, Response} from '../../../../../../_metronic/helpers'
export type Holiday = {
  id?: ID
  name?: string
  date?: string
  is_active?: boolean
}

export type HolidayQueryResponse = Response<Array<Holiday>>

export const initialHoliday: Holiday = {
  id: 0,
  name: "",
  date: "",
  is_active: true
}