import { AxiosResponse } from "axios";
//import { ID, Response } from "../../../../../_metronic/helpers";
import { AssetStoreQueryResponse } from "./_models";
import api from "../../../../services/api"

const getAssetStore = (query: string): Promise<AssetStoreQueryResponse> => {
  return api
    .post(`/dashboard/list-repair-asset`, query)
    .then((d: AxiosResponse<AssetStoreQueryResponse>) => d.data);
};

// const deleteCompany = (CompanyId: ID): Promise<void> => {
//   return axios.delete(`${Company_URL}/${CompanyId}`).then(() => {});
// };

// const deleteSelectedCompanys = (CompanyIds: Array<ID>): Promise<void> => {
//   const requests = CompanyIds.map((id) => axios.delete(`${Company_URL}/${id}`));
//   return axios.all(requests).then(() => {});
// };

export {
    getAssetStore
};
