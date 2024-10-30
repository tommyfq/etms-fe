import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Company, CompaniesQueryResponse, ListAgentQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getCompany = (query: string): Promise<CompaniesQueryResponse> => {
  return api
    .post(`/company/list`, query)
    .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data);
};

const getListAgent = (): Promise<ListAgentQueryResponse> => {
  return api
    .get(`/user/list-agent`)
    .then((d: AxiosResponse<ListAgentQueryResponse>) => {return d.data});
}

const getCompanyById = (id: ID): Promise<Company | undefined> => {
  return api
    .get(`/company/detail/${id}`)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data);
};

const createCompany = (Company: Company): Promise<any> => {
  return api
    .post(`/company/create`, Company)
    .then((response: AxiosResponse<Response<Company>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateCompany = (Company: Company): Promise<any | undefined> => {
  return api
    .post(`/company/update`, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
};

// const deleteCompany = (CompanyId: ID): Promise<void> => {
//   return axios.delete(`${Company_URL}/${CompanyId}`).then(() => {});
// };

// const deleteSelectedCompanys = (CompanyIds: Array<ID>): Promise<void> => {
//   const requests = CompanyIds.map((id) => axios.delete(`${Company_URL}/${id}`));
//   return axios.all(requests).then(() => {});
// };

export {
  getCompany,
  getCompanyById,
  createCompany,
  updateCompany,
  getListAgent
};
