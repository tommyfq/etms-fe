import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { TicketQueryResponse, Ticket, TicketDetail, AssetQueryResponse, OverviewTicketQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getTicket = (query: string): Promise<TicketQueryResponse> => {
  return api
    .post(`/ticket/list`, query)
    .then((d: AxiosResponse<TicketQueryResponse>) => d.data);
};

const getTicketById = (id: ID): Promise<TicketDetail | undefined> => {
  return api
    .get(`/ticket/detail/${id}`)
    .then((response: AxiosResponse<Response<TicketDetail>>) => response.data)
    .then((response: Response<TicketDetail>) => response.data);
};

const createTicket = (ticket: FormData): Promise<any> => {
  console.log(ticket)
  return api
    .post(`/ticket/create`, ticket)
    .then((response: AxiosResponse<Response<Ticket>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateTicket = (Store: FormData): Promise<any | undefined> => {
  return api
    .post(`/ticket/update`, Store)
    .then((response: AxiosResponse<Response<Ticket>>) => response.data)
};

const getListAsset = (): Promise<AssetQueryResponse> => {
    return api
      .get(`/asset/list-option`)
      .then((d: AxiosResponse<AssetQueryResponse>) => {
        console.log(d.data);
        return d.data
    });
  }

  const getOverview = (): Promise<OverviewTicketQueryResponse> => {
    return api
      .get(`/ticket/overview`)
      .then((d: AxiosResponse<OverviewTicketQueryResponse>) => {
        console.log(d.data);
        return d.data
    });
  }

// const uploadFile = (formData: any): Promise<any | undefined> => {
//   return api
//     .patch(`/api/store/upload`, formData)
//     .then((response: AxiosResponse<Response<Store>>) => response.data)
// };

// const deleteCompany = (CompanyId: ID): Promise<void> => {
//   return api.delete(`${Company_URL}/${CompanyId}`).then(() => {});
// };

// const deleteSelectedCompanys = (CompanyIds: Array<ID>): Promise<void> => {
//   const requests = CompanyIds.map((id) => axios.delete(`${Company_URL}/${id}`));
//   return api.all(requests).then(() => {});
// };

export {
    getTicket,
    getTicketById,
    createTicket,
    updateTicket,
    getListAsset,
    getOverview
};
