import { AxiosResponse } from "axios";
import { ChartDataQueryResponse, TicketCountByStatusQueryResponse, SLATicketsQueryResponse} from "./_models";
import api from "../../../services/api"

const DASHBOARD_URL = `/dashboard`;

const getTicketChartByYear = (year: number): Promise<ChartDataQueryResponse> => {
  return api
    .get(`${DASHBOARD_URL}/ticket-chart-by-year/${year}`)
    .then((d: AxiosResponse<ChartDataQueryResponse>) => d.data);
};

const getTicketCountByStatus = (): Promise<TicketCountByStatusQueryResponse> => {
  return api
    .get(`${DASHBOARD_URL}/ticket-count-by-status`)
    .then((d: AxiosResponse<TicketCountByStatusQueryResponse>) => d.data);
};

const getSLATicket = (): Promise<SLATicketsQueryResponse> => {
  return api
    .get(`${DASHBOARD_URL}/sla-ticket-count`)
    .then((d: AxiosResponse<SLATicketsQueryResponse>) => d.data);
};

export {
    getTicketChartByYear,
    getTicketCountByStatus,
    getSLATicket
};
