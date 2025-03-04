import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { TicketQueryResponse, Ticket, TicketDetail, AssetQueryResponse, OverviewTicketQueryResponse, PartQueryResponse, StatusQueryResponse, DiagnosticQueryResponse } from "./_models";
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
  return api
    .post(`/ticket/create`, ticket)
    .then((response: AxiosResponse<Response<Ticket>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateTicket = (Store: TicketDetail): Promise<any | undefined> => {
  return api
    .post(`/ticket/update`, Store)
    .then((response: AxiosResponse<Response<Ticket>>) => response.data)
};

const getListAsset = (): Promise<AssetQueryResponse> => {
    return api
      .get(`/asset/list-option`)
      .then((d: AxiosResponse<AssetQueryResponse>) => {
        return d.data
    });
  }

  const getListPart = (): Promise<PartQueryResponse> => {
    return api
      .get(`/ticket/list-parts`)
      .then((d: AxiosResponse<PartQueryResponse>) => {
        return d.data
    });
  }

  const getListDiagnostics = (): Promise<DiagnosticQueryResponse> => {
    return api
      .get(`/ticket/list-diagnostics`)
      .then((d: AxiosResponse<DiagnosticQueryResponse>) => {
        return d.data
    });
  }

  const getListStatus = (): Promise<StatusQueryResponse> => {
    return api
      .get(`/ticket/list-status`)
      .then((d: AxiosResponse<StatusQueryResponse>) => {
        return d.data
    });
  }

  const getOverview = (): Promise<OverviewTicketQueryResponse> => {
    return api
      .get(`/ticket/overview`)
      .then((d: AxiosResponse<OverviewTicketQueryResponse>) => {
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
    getListPart,
    getListDiagnostics,
    getListStatus,
    getOverview
};
