import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Part, PartQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getPart = (query: string): Promise<PartQueryResponse> => {
  return api
    .post(`/part/list`, query)
    .then((d: AxiosResponse<PartQueryResponse>) => d.data);
};

const getPartById = (id: ID): Promise<Part | undefined> => {
  return api
    .get(`/part/detail/${id}`)
    .then((response: AxiosResponse<Response<Part>>) => response.data)
    .then((response: Response<Part>) => response.data);
};

const createPart = (Part: Part): Promise<any> => {
  return api
    .post(`/part/create`, Part)
    .then((response: AxiosResponse<Response<Part>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updatePart = (Part: Part): Promise<any | undefined> => {
  return api
    .post(`/part/update`, Part)
    .then((response: AxiosResponse<Response<Part>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
    return api
      .patch(`/part/upload`, formData)
      .then((response: AxiosResponse<Response<Part>>) => response.data)
  };
  
  const downloadExcelFile = async (): Promise<void> => {
    try {
      const response = await api.get('/part/download', {
        responseType: 'blob', // Important to specify the response type
      });
  
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'part_data.xlsx'; // Name the downloaded file
  
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
    getPart,
    getPartById,
    createPart,
    updatePart,
    uploadFile,
    downloadExcelFile
}