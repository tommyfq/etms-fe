import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {CompaniesListFilter} from './CompaniesListFilter'

const ItemListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddItemModal = () => {
    console.log("OPEN");
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
      <button type='button' className='btn btn-primary' onClick={openAddItemModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Item
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {ItemListToolbar}
