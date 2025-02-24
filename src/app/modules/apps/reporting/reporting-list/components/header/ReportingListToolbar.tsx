

// import {useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
// import {useListView} from '../../core/ListViewProvider'
// import {StoreUploadModal} from './StoreUploadModal'
import {ReportingListFilter} from './ReportingListFilter'
// import {useAuth} from '../../../../../auth'

const ReportingListToolbar = () => {
//   const {setItemIdForUpdate} = useListView()
//   const {currentUser} = useAuth()
//   const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

//   const openAddCompanyModal = () => {
//     console.log("OPEN");
//     setItemIdForUpdate(null)
//   }

//   const openUploadModal = () => {
//     setShowUploadModal(true)
//   }

  return (
    <>
      <div className='d-flex justify-content-end' style={{ width: '100%' }} data-kt-user-table-toolbar='base'>
        <ReportingListFilter />

        {/* begin::Export */}
        <button type='button' className='btn btn-light-primary me-3'>
          <KTIcon iconName='exit-down' className='fs-2' />
          Export
        </button>
        {/* end::Export */}
          
        
        {/* </Link> */}
        
        {/* end::Add user */}
      </div>
      {/* {
        showUploadModal && (
          <StoreUploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} />
        )
      } */}
    </>
    
  )
}

export default ReportingListToolbar
