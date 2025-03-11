// import {useListView} from '../../core/ListViewProvider'
import {CaseCategoryListToolbar} from './CaseCategoryListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
import {CaseCategoryListSearch} from './CaseCategoryListSearch'

const CaseCategoryListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CaseCategoryListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <CaseCategoryListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {CaseCategoryListHeader}
