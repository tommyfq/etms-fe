import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { DC, DCQueryResponse, ListCompanyQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getDC = (query: string): Promise<DCQueryResponse> => {
  return api
    .post(`/dc/list`, query)
    .then((d: AxiosResponse<DCQueryResponse>) => d.data);
};

const getListCompany = (): Promise<ListCompanyQueryResponse> => {
  return api
    .get(`/company/list-option`)
    .then((d: AxiosResponse<ListCompanyQueryResponse>) => {return d.data});
}

const getDCById = (id: ID): Promise<DC | undefined> => {
  return api
    .get(`/dc/detail/${id}`)
    .then((response: AxiosResponse<Response<DC>>) => response.data)
    .then((response: Response<DC>) => response.data);
};

const createDC = (DC: DC): Promise<any> => {
  return api
    .post(`/dc/create`, DC)
    .then((response: AxiosResponse<Response<DC>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateDC = (DC: DC): Promise<any | undefined> => {
  return api
    .post(`/dc/update`, DC)
    .then((response: AxiosResponse<Response<DC>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
  return api
    .patch(`/dc/upload`, formData)
    .then((response: AxiosResponse<Response<DC>>) => response.data)
};

const downloadExcelFile = async (): Promise<void> => {
  try {
    const response = await api.get('/dc/download', {
      responseType: 'blob', // Important to specify the response type
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'dc_data.xlsx'; // Name the downloaded file

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
  getDC,
//   deleteCompany,
//   deleteSelectedCompanys,
  getDCById,
  createDC,
  updateDC,
  getListCompany,
  uploadFile,
  downloadExcelFile
};
