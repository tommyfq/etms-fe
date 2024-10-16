import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Company, CompaniesQueryResponse, ListAgentQueryResponse } from "./_models";

const API_URL = import.meta.env.ETMS_API_URL;
const Company_URL = `${API_URL}/company`;
const GET_COMPANY_URL = `/company/list`;

const getCompany = (query: string): Promise<CompaniesQueryResponse> => {
  console.log("get company");
  console.log(API_URL);
  console.log(`http://localhost:8080/api${GET_COMPANY_URL}`);
  return axios
    .post(`http://localhost:8080/api${GET_COMPANY_URL}`, query)
    .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data);
};

const getListAgent = (): Promise<ListAgentQueryResponse> => {
  return axios
    .get(`http://localhost:8080/api/user/list-agent`)
    .then((d: AxiosResponse<ListAgentQueryResponse>) => {return d.data});
}

const getCompanyById = (id: ID): Promise<Company | undefined> => {
  return axios
    .get(`http://localhost:8080/api/company/detail/${id}`)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data);
};

const createCompany = (Company: Company): Promise<any> => {
  console.log(`${Company_URL}/create`)
  return axios
    .post(`http://localhost:8080/api/company/create`, Company)
    .then((response: AxiosResponse<Response<Company>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateCompany = (Company: Company): Promise<any | undefined> => {
  return axios
    .post(`http://localhost:8080/api/company/update`, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
};

const deleteCompany = (CompanyId: ID): Promise<void> => {
  return axios.delete(`${Company_URL}/${CompanyId}`).then(() => {});
};

const deleteSelectedCompanys = (CompanyIds: Array<ID>): Promise<void> => {
  const requests = CompanyIds.map((id) => axios.delete(`${Company_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getCompany,
  deleteCompany,
  deleteSelectedCompanys,
  getCompanyById,
  createCompany,
  updateCompany,
  getListAgent
};
