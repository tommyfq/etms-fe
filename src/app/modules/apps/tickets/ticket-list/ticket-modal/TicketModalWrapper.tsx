import {useQuery} from 'react-query'
import {TicketModalForm} from './TicketModalForm'
import {TicketEditModalForm} from './TicketEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getTicketById} from '../core/_request'

const TicketModalWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getTicketById(itemIdForUpdate)
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
    return <TicketModalForm isUserLoading={isLoading} ticket={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <TicketEditModalForm isUserLoading={isLoading} ticket={data} />
  }

  return null
}

export {TicketModalWrapper}
