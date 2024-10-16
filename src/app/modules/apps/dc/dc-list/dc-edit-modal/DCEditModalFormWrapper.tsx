import {useQuery} from 'react-query'
import {DCEditModalForm} from './DCEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getDCById} from '../core/_request'

const DCEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getDCById(itemIdForUpdate)
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
    return <DCEditModalForm isUserLoading={isLoading} dc={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <DCEditModalForm isUserLoading={isLoading} dc={data} />
  }

  return null
}

export {DCEditModalFormWrapper}
