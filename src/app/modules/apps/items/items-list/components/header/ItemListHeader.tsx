// import {useListView} from '../../core/ListViewProvider'
import {ItemListToolbar} from './ItemListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
import {ItemListSearch} from './ItemListSearch'

const ItemListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ItemListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <ItemListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ItemListHeader}
