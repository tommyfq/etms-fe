import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { CaseCategory, CaseCategoryQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getCaseCategory = (query: string): Promise<CaseCategoryQueryResponse> => {
  return api
    .post(`/case-category/list`, query)
    .then((d: AxiosResponse<CaseCategoryQueryResponse>) => d.data);
};

const getCaseCategoryById = (id: ID): Promise<CaseCategory | undefined> => {
  return api
    .get(`/case-category/detail/${id}`)
    .then((response: AxiosResponse<Response<CaseCategory>>) => response.data)
    .then((response: Response<CaseCategory>) => response.data);
};

const createCaseCategory = (CaseCategory: CaseCategory): Promise<any> => {
  return api
    .post(`/case-category/create`, CaseCategory)
    .then((response: AxiosResponse<Response<CaseCategory>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateCaseCategory = (CaseCategory: CaseCategory): Promise<any | undefined> => {
  return api
    .post(`/case-category/update`, CaseCategory)
    .then((response: AxiosResponse<Response<CaseCategory>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
    return api
      .patch(`/case-category/upload`, formData)
      .then((response: AxiosResponse<Response<CaseCategory>>) => response.data)
  };
  
  const downloadExcelFile = async (): Promise<void> => {
    try {
      const response = await api.get('/case-category/download', {
        responseType: 'blob', // Important to specify the response type
      });
  
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'case_category_data.xlsx'; // Name the downloaded file
  
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

export {
    getCaseCategory,
    getCaseCategoryById,
    createCaseCategory,
    updateCaseCategory,
    uploadFile,
    downloadExcelFile
}