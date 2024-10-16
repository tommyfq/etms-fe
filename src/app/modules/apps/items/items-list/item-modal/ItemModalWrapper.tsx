import {useQuery} from 'react-query'
import {ItemModalForm} from './ItemModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import { getItemById} from '../core/_requests'

const ItemModalWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getItemById(itemIdForUpdate)
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
    return <ItemModalForm isUserLoading={isLoading} item={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <ItemModalForm isUserLoading={isLoading} item={data} />
  }

  return null
}

export {ItemModalWrapper}
