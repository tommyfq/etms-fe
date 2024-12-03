
// import {UsersListGrouping} from './UsersListGrouping'
import {AssetListSearch} from './AssetListSearch'

const AssetListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <AssetListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {AssetListHeader}
