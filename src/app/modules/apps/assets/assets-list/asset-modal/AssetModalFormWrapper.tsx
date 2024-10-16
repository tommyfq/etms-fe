import {useQuery} from 'react-query'
import {AssetModalForm} from './AssetModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getAssetById} from '../core/_requests'

const AssetModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getAssetById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )


  if (!itemIdForUpdate) {
    return <AssetModalForm isUserLoading={isLoading} asset={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <AssetModalForm isUserLoading={isLoading} asset={data} />
  }

  return null
}

export {AssetModalFormWrapper}
