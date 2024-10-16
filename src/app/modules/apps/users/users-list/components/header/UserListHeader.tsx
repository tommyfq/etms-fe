// import {useListView} from '../../core/ListViewProvider'
import {UserlistToolbar} from './UserlistToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

const UserListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
      
        {/* begin::Group actions */}
        <UserlistToolbar />
        {/* end::Group actions */}
      
      {/* end::Card toolbar */}
    </div>
  )
}

export {UserListHeader}
