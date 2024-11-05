import { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Asset, AssetQueryResponse, ListDCQueryResponse, ListStoreQueryResponse, ListBrandQueryResponse, ListModelQueryResponse } from "./_models";
import api from "../../../../../services/api"

const ASSET_URL = `/asset`;

const getAsset = (query: string): Promise<AssetQueryResponse> => {
  return api
    .post(`${ASSET_URL}/list`, query)
    .then((d: AxiosResponse<AssetQueryResponse>) => d.data);
};

const getListDC = (): Promise<ListDCQueryResponse> => {
  return api
    .get(`/dc/list-option`)
    .then((d: AxiosResponse<ListDCQueryResponse>) => {return d.data});
}

const getListStore = (id: number): Promise<ListStoreQueryResponse> => {
    return api
      .get(`/dc/list-store-option/${id}`)
      .then((d: AxiosResponse<ListStoreQueryResponse>) => {return d.data});
  }

  const getListBrand = (): Promise<ListBrandQueryResponse> => {
    return api
      .get(`/item/list-brand`)
      .then((d: AxiosResponse<ListBrandQueryResponse>) => {return d.data});
  }

  const getListModel = (brand:string): Promise<ListModelQueryResponse> => {
    return api
      .post(`/item/list-model`,{brand:brand})
      .then((d: AxiosResponse<ListModelQueryResponse>) => {return d.data});
  }

const getAssetById = (id: ID): Promise<Asset | undefined> => {
  return api
    .get(`${ASSET_URL}/detail/${id}`)
    .then((response: AxiosResponse<Response<Asset>>) => response.data)
    .then((response: Response<Asset>) => response.data);
};

const createAsset = (Company: Asset): Promise<any> => {
  return api
    .post(`${ASSET_URL}/create`, Company)
    .then((response: AxiosResponse<Response<Asset>>) => {return response.data})
    //.then((response: Response<Company>) => response.data);
};

const updateAsset = (Company: Asset): Promise<any | undefined> => {
  return api
    .post(`${ASSET_URL}/update`, Company)
    .then((response: AxiosResponse<Response<Asset>>) => response.data)
};

const uploadFile = (formData: any): Promise<any | undefined> => {
  return api
    .patch(`${ASSET_URL}/upload`, formData)
    .then((response: AxiosResponse<Response<Asset>>) => response.data)
};


const downloadExcelFile = async (): Promise<void> => {
  try {
    const response = await api.get('/asset/download', {
      responseType: 'blob', // Important to specify the response type
    });

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'asset_data.xlsx'; // Name the downloaded file

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
  getAsset,
  getAssetById,
  createAsset,
  updateAsset,
  getListDC,
  getListStore,
  getListBrand,
  getListModel,
  downloadExcelFile,
  uploadFile
};
