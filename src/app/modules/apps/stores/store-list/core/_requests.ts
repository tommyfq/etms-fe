import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Store, StoreQueryResponse, ListDCQueryResponse, ListCompanyQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getStore = (query: string): Promise<StoreQueryResponse> => {
  return api
    .post(`/store/list`, query)
    .then((d: AxiosResponse<StoreQueryResponse>) => d.data);
};

const getListDC = (companyId:number): Promise<ListDCQueryResponse> => {
  return api
    .get(`/dc/list-option/${companyId}`)
    .then((d: AxiosResponse<ListDCQueryResponse>) => {return d.data});
}

const getListCompany = (): Promise<ListCompanyQueryResponse> => {
  return api
    .get(`/company/list-option`)
    .then((d: AxiosResponse<ListCompanyQueryResponse>) => {return d.data});
}

const getStoreById = (id: ID): Promise<Store | undefined> => {
  return api
    .get(`/store/detail/${id}`)
    .then((response: AxiosResponse<Response<Store>>) => response.data)
    .then((response: Response<Store>) => response.data);
};

const createStore = (Store: Store): Promise<any> => {
  return api
    .post(`/store/create`, Store)
    .then((response: AxiosResponse<Response<Store>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateStore = (Store: Store): Promise<any | undefined> => {
  return api
    .post(`/store/update`, Store)
    .then((response: AxiosResponse<Response<Store>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
  return api
    .patch(`/store/upload`, formData)
    .then((response: AxiosResponse<Response<Store>>) => response.data)
};

const downloadExcelFile = async (): Promise<void> => {
  try {
    const response = await api.get('/store/download', {
      responseType: 'blob', // Important to specify the response type
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'store_data.xlsx'; // Name the downloaded file

    // Append to the document body
    document.body.appendChild(link);

    // Trigger the download by simulating click
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    // Handle error appropriately (e.g., show an alert to the user)
  }
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
  uploadFile,
  getStoreById,
  createStore,
  updateStore,
  getListDC,
  getListCompany,
  downloadExcelFile
};
