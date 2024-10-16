import {useQuery} from 'react-query'
import {CompanyEditModalForm} from './CompanyEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getCompanyById} from '../core/_request'

const CompanyEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  const {
    isLoading,
    data: data,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getCompanyById(itemIdForUpdate)
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
    return <CompanyEditModalForm isUserLoading={isLoading} company={{id: 0}} />
  }

  if (!isLoading && !error && data) {
    return <CompanyEditModalForm isUserLoading={isLoading} company={data} />
  }

  return null
}

export {CompanyEditModalFormWrapper}
