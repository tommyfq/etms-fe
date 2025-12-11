// import {useListView} from '../../core/ListViewProvider'
import {HolidayListToolbar} from './HolidayListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
import {HolidayListSearch} from './HolidayListSearch'

const HolidayListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <HolidayListSearch />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <HolidayListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {HolidayListHeader}