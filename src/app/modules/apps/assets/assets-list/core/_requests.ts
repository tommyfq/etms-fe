import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Asset, AssetQueryResponse, ListDCQueryResponse, ListStoreQueryResponse, ListBrandQueryResponse, ListModelQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_ETMS_API_URL;
const ASSET_URL = `${API_URL}/asset`;

const getAsset = (query: string): Promise<AssetQueryResponse> => {
  console.log("get asset");
  console.log(API_URL);
  console.log(`http://localhost:8080/api/asset/list}`);
  return axios
    .post(`${ASSET_URL}/list`, query)
    .then((d: AxiosResponse<AssetQueryResponse>) => d.data);
};

const getListDC = (): Promise<ListDCQueryResponse> => {
  return axios
    .get(`${API_URL}/dc/list-option`)
    .then((d: AxiosResponse<ListDCQueryResponse>) => {return d.data});
}

const getListStore = (id: number): Promise<ListStoreQueryResponse> => {
    return axios
      .get(`${API_URL}/dc/list-store-option/${id}`)
      .then((d: AxiosResponse<ListStoreQueryResponse>) => {return d.data});
  }

  const getListBrand = (): Promise<ListBrandQueryResponse> => {
    return axios
      .get(`${API_URL}/item/list-brand`)
      .then((d: AxiosResponse<ListBrandQueryResponse>) => {return d.data});
  }

  const getListModel = (brand:string): Promise<ListModelQueryResponse> => {
    return axios
      .post(`${API_URL}/item/list-model`,{brand:brand})
      .then((d: AxiosResponse<ListModelQueryResponse>) => {return d.data});
  }

const getAssetById = (id: ID): Promise<Asset | undefined> => {
  return axios
    .get(`${ASSET_URL}/detail/${id}`)
    .then((response: AxiosResponse<Response<Asset>>) => response.data)
    .then((response: Response<Asset>) => response.data);
};

const createAsset = (Company: Asset): Promise<any> => {
  return axios
    .post(`${ASSET_URL}/create`, Company)
    .then((response: AxiosResponse<Response<Asset>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateAsset = (Company: Asset): Promise<any | undefined> => {
  return axios
    .post(`${ASSET_URL}/update`, Company)
    .then((response: AxiosResponse<Response<Asset>>) => response.data)
};


export {
  getAsset,
  getAssetById,
  createAsset,
  updateAsset,
  getListDC,
  getListStore,
  getListBrand,
  getListModel
};
