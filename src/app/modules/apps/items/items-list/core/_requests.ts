import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Item, ItemQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_ETMS_API_URL;

const getItem = (query: string): Promise<ItemQueryResponse> => {
  console.log("get item");
  console.log(`${API_URL}/item/list`);
  return axios
    .post(`${API_URL}/item/list`, query)
    .then((d: AxiosResponse<ItemQueryResponse>) => d.data);
};

const getListBrand = (): Promise<string[]> => {
  return axios
    .get(`${API_URL}/item/list-brand`)
    .then((d: AxiosResponse<string[]>) => {return d.data});
}

const getListModel = (brand: string): Promise<string[]> => {
    return axios
      .post(`${API_URL}/item/list-model`,{brand:brand})
      .then((d: AxiosResponse<string[]>) => {return d.data});
  }

const getItemById = (id: ID): Promise<Item | undefined> => {
  return axios
    .get(`${API_URL}/item/detail/${id}`)
    .then((response: AxiosResponse<Response<Item>>) => response.data)
    .then((response: Response<Item>) => response.data);
};

const createItem = (Item: Item): Promise<any> => {
  return axios
    .post(`${API_URL}/item/create`, Item)
    .then((response: AxiosResponse<Response<Item>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateItem = (Item: Item): Promise<any | undefined> => {
  return axios
    .post(`${API_URL}/item/update`, Item)
    .then((response: AxiosResponse<Response<Item>>) => response.data)
};


export {
  getItem,
  getItemById,
  createItem,
  updateItem,
  getListBrand,
  getListModel
};
