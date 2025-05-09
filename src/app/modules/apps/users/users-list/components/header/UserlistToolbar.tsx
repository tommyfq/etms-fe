import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import UserListFilter from './UserListFilter'

const UserlistToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddCompanyrModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <CompaniesListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add user */}
      {/* <Link to='/dashboard' className='d-lg-none'> */}
        <UserListFilter />
        {/* <button type='button' className='btn btn-primary'> */}
        <button type='button' className='btn btn-primary' onClick={openAddCompanyrModal}>
          <KTIcon iconName='plus' className='fs-2' />
          Add User
        </button>
       
      {/* </Link> */}
      
      {/* end::Add user */}
    </div>
  )
}

export {UserlistToolbar}
