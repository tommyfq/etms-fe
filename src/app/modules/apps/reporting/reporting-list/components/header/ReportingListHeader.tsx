// import {useListView} from '../../core/ListViewProvider'
// import {TicketListToolbar} from './TicketListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

import ReportingListToolbar from "./ReportingListToolbar"

const ReportingListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
        {/* begin::Group actions */}
        <ReportingListToolbar />
        {/* end::Group actions */}
      
      {/* end::Card toolbar */}
    </div>
  )
}

export {ReportingListHeader}
