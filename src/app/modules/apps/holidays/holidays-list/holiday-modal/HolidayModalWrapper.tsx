import {useQuery} from 'react-query'
import {HolidayModalForm} from './HolidayModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import { getHolidayById} from '../core/_requests'

const HolidayModalWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-holiday-${itemIdForUpdate}`,
    () => {
      return getHolidayById(itemIdForUpdate)
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
    return <HolidayModalForm isUserLoading={isLoading} holiday={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <HolidayModalForm isUserLoading={isLoading} holiday={data} />
  }

  return null
}

export {HolidayModalWrapper}