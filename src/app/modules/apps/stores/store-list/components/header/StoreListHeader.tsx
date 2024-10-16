// import {useListView} from '../../core/ListViewProvider'
import {StoreListToolbar} from './StoreListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

const StoreListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
      
        {/* begin::Group actions */}
        <StoreListToolbar />
        {/* end::Group actions */}
      
      {/* end::Card toolbar */}
    </div>
  )
}

export {StoreListHeader}
