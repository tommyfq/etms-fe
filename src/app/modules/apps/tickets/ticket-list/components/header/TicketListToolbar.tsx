

// import {useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {StoreUploadModal} from './StoreUploadModal'
import {TicketListFilter} from './TicketListFilter'
import {useAuth} from '../../../../../auth'

const TicketListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const {currentUser} = useAuth()
//   const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  const openAddCompanyModal = () => {
    console.log("OPEN");
    setItemIdForUpdate(null)
  }

//   const openUploadModal = () => {
//     setShowUploadModal(true)
//   }

  return (
    <>
      <div className='d-flex justify-content-end' style={{ width: '100%' }} data-kt-user-table-toolbar='base'>
        <TicketListFilter />

        {/* begin::Export */}
        <button type='button' className='btn btn-light-primary me-3'>
          <KTIcon iconName='exit-down' className='fs-2' />
          Export
        </button>
        {/* end::Export */}

        {/* begin::Add user */}
        {/* <Link to='/dashboard' className='d-lg-none'> */}
          {/* <button type='button' className='btn btn-primary'> */}
          {/* <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
            <KTIcon iconName='exit-up' className='fs-2'/>
            Upload
          </button> */}
          {
            currentUser?.role_name != "agent" ? (
              <button type='button' className='btn btn-primary' onClick={openAddCompanyModal}>
                <KTIcon iconName='plus' className='fs-2' />
                Add Ticket
              </button>
            ) : null
          }
          
        
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

export {TicketListToolbar}
