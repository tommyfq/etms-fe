// import {useListView} from '../../core/ListViewProvider'
import {CompanyListToolbar} from './CompanyListToolbar'
// import {UsersListGrouping} from './UsersListGrouping'
// import {UsersListSearchComponent} from './UsersListSearchComponent'

const CompaniesListHeader = () => {
  // const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      {/* <UsersListSearchComponent /> */}
        {/* begin::Group actions */}
        <CompanyListToolbar />
        {/* end::Group actions */}
    </div>
  )
}

export {CompaniesListHeader}
