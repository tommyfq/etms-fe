

import {useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {StoreUploadModal} from './StoreUploadModal'

const StoreListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  const openAddCompanyModal = () => {
    console.log("OPEN");
    setItemIdForUpdate(null)
  }

  const openUploadModal = () => {
    setShowUploadModal(true)
  }

  return (
    <>
      <div className='d-flex justify-content-end' style={{ width: '100%' }} data-kt-user-table-toolbar='base'>
        {/* <CompaniesListFilter /> */}

        {/* begin::Export */}
        {/* <button type='button' className='btn btn-light-primary me-3'>
          <KTIcon iconName='exit-up' className='fs-2' />
          Export
        </button> */}
        {/* end::Export */}

        {/* begin::Add user */}
        {/* <Link to='/dashboard' className='d-lg-none'> */}
          {/* <button type='button' className='btn btn-primary'> */}
          <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
            <KTIcon iconName='exit-up' className='fs-2'/>
            Upload
          </button>
          <button type='button' className='btn btn-primary' onClick={openAddCompanyModal}>
            <KTIcon iconName='plus' className='fs-2' />
            Add Store
          </button>
        
        {/* </Link> */}
        
        {/* end::Add user */}
      </div>
      {
        showUploadModal && (
          <StoreUploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} />
        )
      }
    </>
    
  )
}

export {StoreListToolbar}
