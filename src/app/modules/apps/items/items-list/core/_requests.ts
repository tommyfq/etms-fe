import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Item, ItemQueryResponse } from "./_models";
import api from "../../../../../services/api"

const getItem = (query: string): Promise<ItemQueryResponse> => {
  return api
    .post(`/item/list`, query)
    .then((d: AxiosResponse<ItemQueryResponse>) => d.data);
};

const getListBrand = (): Promise<string[]> => {
  return api
    .get(`/item/list-brand`)
    .then((d: AxiosResponse<string[]>) => {return d.data});
}

const getListModel = (brand: string): Promise<string[]> => {
    return api
      .post(`/item/list-model`,{brand:brand})
      .then((d: AxiosResponse<string[]>) => {return d.data});
  }

const getItemById = (id: ID): Promise<Item | undefined> => {
  return api
    .get(`/item/detail/${id}`)
    .then((response: AxiosResponse<Response<Item>>) => response.data)
    .then((response: Response<Item>) => response.data);
};

const createItem = (Item: Item): Promise<any> => {
  return api
    .post(`/item/create`, Item)
    .then((response: AxiosResponse<Response<Item>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateItem = (Item: Item): Promise<any | undefined> => {
  return api
    .post(`/item/update`, Item)
    .then((response: AxiosResponse<Response<Item>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
  return api
    .patch(`/item/upload`, formData)
    .then((response: AxiosResponse<Response<Item>>) => response.data)
};

const downloadExcelFile = async (): Promise<void> => {
  try {
    const response = await api.get('/item/download', {
      responseType: 'blob', // Important to specify the response type
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'item_data.xlsx'; // Name the downloaded file

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
  getItem,
  getItemById,
  createItem,
  updateItem,
  getListBrand,
  getListModel,
  downloadExcelFile,
  uploadFile
};
