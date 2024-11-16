
import {Response} from '../../../../_metronic/helpers'

export type ChartData = {
    chartData: number[];
    yearList: number[]
}

export type ChartDataQueryResponse = Response<ChartData>

export type TicketCounts = {
  status:string;
  count:number
}

export type TicketByStatus = {
  ticketCounts: TicketCounts[];
  total:number;
}

export type TicketCountByStatusQueryResponse = Response<TicketByStatus>

export type SLATickets = {
  total_tickets?: number,
  sla_performed?: number,
  sla_not_performed?: number
}

export type SLATicketsQueryResponse = Response<SLATickets>
