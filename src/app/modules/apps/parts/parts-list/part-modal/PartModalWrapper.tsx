import {useQuery} from 'react-query'
import {CaseCategoryModalForm} from './PartModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import { getPartById } from '../core/_requests'

const PartModalWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getPartById(itemIdForUpdate)
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
    return <CaseCategoryModalForm isUserLoading={isLoading} item={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <CaseCategoryModalForm isUserLoading={isLoading} item={data} />
  }

  return null
}

export {PartModalWrapper}
