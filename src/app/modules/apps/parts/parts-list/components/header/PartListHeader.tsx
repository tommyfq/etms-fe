// import {useListView} from '../../core/ListViewProvider'
import {PartListToolbar} from './PartListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
import {PartListSearch} from './PartListSearch'

const PartListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <PartListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <PartListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {PartListHeader}
