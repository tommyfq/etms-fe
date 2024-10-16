import {useQuery} from 'react-query'
import {StoreModalForm} from './StoreModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getStoreById} from '../core/_requests'

const StoreModalWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getStoreById(itemIdForUpdate)
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
    return <StoreModalForm isUserLoading={isLoading} store={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <StoreModalForm isUserLoading={isLoading} store={data} />
  }

  return null
}

export {StoreModalWrapper}
