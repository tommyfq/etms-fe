import {Response} from '../../../../../../_metronic/helpers'

export type Reporting = {
  dc_name?: string
  dc_code?: string
  store_name?: string
  store_code?: string
  brand?: string
  model?: string
  serial_number?: string
  created_at?: string
  in_progress_at?: string
  closed_at?: string
  sla?: number
  status?: string
  description?: string
  diagnostic_name?: string
  part_name?: string
  comment_client?: string
  ticket_no?: string
}

export type ReportingQueryResponse = Response<Array<Reporting>>

export type ListYearQueryResponse = Response<Array<string>>

export type ListMonth = {
  value: number
  label: string
}

export type ListMonthQueryResponse = Response<Array<ListMonth>>

export const initialReporting: Reporting = {
    dc_name: "",
    dc_code: "",
    store_name: "",
    store_code: "",
    brand: "",
    model: "",
    serial_number: "",
    created_at: "",
    in_progress_at: "",
    closed_at: "",
    sla: 0,
    status: "",
    description: "",
    diagnostic_name: "",
    part_name: "",
    comment_client:"",
    ticket_no: ""
}