// import {useListView} from '../../core/ListViewProvider'
import {UserlistToolbar} from './UserlistToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
import {UserListSearch} from './UserListSearch'

const UserListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <UserListSearch />
      {/* begin::Card toolbar */}
        <div className='card-toolbar'>
        {/* begin::Group actions */}
          <UserlistToolbar />
        {/* end::Group actions */}
        </div>
      
      {/* end::Card toolbar */}
    </div>
  )
}

export {UserListHeader}
