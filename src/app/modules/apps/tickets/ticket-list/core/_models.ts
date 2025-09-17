import {ID, Response} from '../../../../../../_metronic/helpers'

export type TicketList = {
  id?: ID,
  ticket_no?: string
  title?: string
  status?: string
  part_name?: string
  serial_number?: string
  brand?: string
  model?: string
  dc_code?: string
  dc_name?: string
  store_code?: string
  store_name?: string
  priority?: string
  createdAt?: string
  on_hold?: boolean
  case_category?: string
}

export type Ticket = {
    title?: string;            // Title of the ticket
    asset_id?: number;        // ID of the asset (assuming it's a number)
    description?: string;     // Description of the ticket
    cc?: string;            // Array of email addresses (string array)
    due_date?: string;        // Due date in ISO format (string)
}

export type TicketAttachment = {
    full_url: string;
};

export type TicketLog = {
    status?: string;
    createdAt?: string;
    user?: TicketLogUser;
    text?: string;
}

export type TicketLogUser = {
    username?: string;
    email?: string;
}

export type TicketDetail = {
    id?: ID,
    ticket_no?: string
    title?: string
    status?: string
    priority?: string
    createdAt?: string
    on_hold?: boolean
    asset_id?: number
    part_id?: number
    part_name?: string
    diagnostic_id?:number
    brand?: string
    model?: string
    store_name?: string
    dc_name?: string
    description?: string
    cc?: string
    created_by?: string
    due_date?: string
    closed_at?: string
    comment_client?: string
    comment_client_date?: string
    comment_client_by?: string
    comment_internal?: string
    comment_internal_date?: string
    comment_internal_by?: string
    serial_number?:string
    attachments?: TicketAttachment[]
    ticket_logs?: TicketLog[]
    swap_asset_id?:number,
    customer_reference_no?: string
}

export type TicketQueryResponse = Response<Array<TicketList>>

export const initialTicket: TicketDetail = {
    id: 0,
    ticket_no: "",
    title: "",
    status: "",
    priority: "",
    createdAt: "",
    on_hold: false,
    asset_id: 0,
    part_id:0,
    part_name: "",
    diagnostic_id: 0,
    brand: "",
    model: "",
    store_name: "",
    dc_name: "",
    description: "",
    cc:"",
    created_by: "",
    due_date: "",
    closed_at: "",
    comment_client: "",
    comment_client_date: "",
    comment_client_by: "",
    comment_internal: "",
    comment_internal_date: "",
    comment_internal_by: "",
    serial_number:"",
    attachments: [],
    ticket_logs:[],
    swap_asset_id:0,
    customer_reference_no:""
}

export type Asset = {
    asset_id?: number,
    serial_number?: string
    brand?: string
    model?: string
    store_name?: string
    dc_name?: string
}

export type AssetQueryResponse = Response<Array<Asset>>

export type Part = {
    part_id?: number,
    part_name?: string
}

export type PartQueryResponse = Response<Array<Part>>

export type Diagnostic = {
    diagnostic_id?: number,
    diagnostic_name?: string
}

export type DiagnosticQueryResponse = Response<Array<Diagnostic>>

export type StatusQueryResponse = Response<Array<string>>

export type OverviewTicket = {
    count?: number,
    status?: string
}

export type OverviewTicketQueryResponse = Response<Array<OverviewTicket>>

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