import {StoreListToolbar} from './StoreListToolbar'
import { StoreListSearch } from './StoreListSearch'

const StoreListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <StoreListSearch />
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
        <div className='card-toolbar'>
        {/* begin::Group actions */}
        <StoreListToolbar />
        {/* end::Group actions */}
        </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {StoreListHeader}
