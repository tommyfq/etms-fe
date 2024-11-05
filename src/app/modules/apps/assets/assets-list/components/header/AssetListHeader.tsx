// import {useListView} from '../../core/ListViewProvider'
import { AssetListSearch } from './AssetListSearch'
import {AssetListToolbar} from './AssetListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'

const AssetListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <AssetListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <AssetListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {AssetListHeader}
