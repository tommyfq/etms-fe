// import {useListView} from '../../core/ListViewProvider'
import {DCListToolbar} from './DCListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
import {DCListSearch} from './DCListSearch'

const DCListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <DCListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <DCListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {DCListHeader}
