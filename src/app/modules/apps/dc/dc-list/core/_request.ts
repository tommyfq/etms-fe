import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { DC, DCQueryResponse, ListCompanyQueryResponse } from "./_models";

const API_URL = import.meta.env.ETMS_API_URL;
const Company_URL = `${API_URL}/company`;

const getDC = (query: string): Promise<DCQueryResponse> => {
  console.log(`http://localhost:8080/api/dc/list`);
  return axios
    .post(`http://localhost:8080/api/dc/list`, query)
    .then((d: AxiosResponse<DCQueryResponse>) => d.data);
};

const getListCompany = (): Promise<ListCompanyQueryResponse> => {
  return axios
    .get(`http://localhost:8080/api/company/list-option`)
    .then((d: AxiosResponse<ListCompanyQueryResponse>) => {return d.data});
}

const getDCById = (id: ID): Promise<DC | undefined> => {
  return axios
    .get(`http://localhost:8080/api/dc/detail/${id}`)
    .then((response: AxiosResponse<Response<DC>>) => response.data)
    .then((response: Response<DC>) => response.data);
};

const createDC = (DC: DC): Promise<any> => {
  return axios
    .post(`http://localhost:8080/api/dc/create`, DC)
    .then((response: AxiosResponse<Response<DC>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateDC = (DC: DC): Promise<any | undefined> => {
  return axios
    .post(`http://localhost:8080/api/dc/update`, DC)
    .then((response: AxiosResponse<Response<DC>>) => response.data)
};

// const deleteCompany = (CompanyId: ID): Promise<void> => {
//   return axios.delete(`${Company_URL}/${CompanyId}`).then(() => {});
// };

// const deleteSelectedCompanys = (CompanyIds: Array<ID>): Promise<void> => {
//   const requests = CompanyIds.map((id) => axios.delete(`${Company_URL}/${id}`));
//   return axios.all(requests).then(() => {});
// };

export {
  getDC,
//   deleteCompany,
//   deleteSelectedCompanys,
  getDCById,
  createDC,
  updateDC,
  getListCompany
};
