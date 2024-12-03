import {Response} from '../../../../../_metronic/helpers'
export type AssetStore = {
  store_code?: string
  store_name?: string
  asset_count?: number
  active_asset_count?: number
  repaired_asset_count?: number
  percentage?: number
}

export type AssetStoreQueryResponse = Response<Array<AssetStore>>