// import {useListView} from '../../core/ListViewProvider'
import {DCListToolbar} from './DCListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

const DCListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
      
        {/* begin::Group actions */}
        <DCListToolbar />
        {/* end::Group actions */}
      
      {/* end::Card toolbar */}
    </div>
  )
}

export {DCListHeader}
