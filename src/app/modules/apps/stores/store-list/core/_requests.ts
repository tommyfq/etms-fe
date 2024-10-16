import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Store, StoreQueryResponse, ListDCQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_ETMS_API_URL;

const getStore = (query: string): Promise<StoreQueryResponse> => {
  return axios
    .post(`${API_URL}/store/list`, query)
    .then((d: AxiosResponse<StoreQueryResponse>) => d.data);
};

const getListDC = (): Promise<ListDCQueryResponse> => {
  return axios
    .get(`${API_URL}/dc/list-option`)
    .then((d: AxiosResponse<ListDCQueryResponse>) => {return d.data});
}

const getStoreById = (id: ID): Promise<Store | undefined> => {
  return axios
    .get(`${API_URL}/store/detail/${id}`)
    .then((response: AxiosResponse<Response<Store>>) => response.data)
    .then((response: Response<Store>) => response.data);
};

const createStore = (Store: Store): Promise<any> => {
  return axios
    .post(`${API_URL}/store/create`, Store)
    .then((response: AxiosResponse<Response<Store>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateStore = (Store: Store): Promise<any | undefined> => {
  return axios
    .post(`${API_URL}/dc/update`, Store)
    .then((response: AxiosResponse<Response<Store>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
  return axios
    .patch(`${API_URL}/store/upload`, formData)
    .then((response: AxiosResponse<Response<Store>>) => response.data)
};

// const deleteCompany = (CompanyId: ID): Promise<void> => {
//   return axios.delete(`${Company_URL}/${CompanyId}`).then(() => {});
// };

// const deleteSelectedCompanys = (CompanyIds: Array<ID>): Promise<void> => {
//   const requests = CompanyIds.map((id) => axios.delete(`${Company_URL}/${id}`));
//   return axios.all(requests).then(() => {});
// };

export {
  getStore,
//   deleteCompany,
//   deleteSelectedCompanys,
  uploadFile,
  getStoreById,
  createStore,
  updateStore,
  getListDC
};
