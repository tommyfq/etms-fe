

// import {useState} from 'react'
// import {StoreUploadModal} from './StoreUploadModal'
import {TicketListFilter} from './TicketListFilter'

const TicketListToolbar = () => {
//   const [showUploadModal, setShowUploadModal] = useState<boolean>(false)


//   const openUploadModal = () => {
//     setShowUploadModal(true)
//   }

  return (
    <>
      <div className='d-flex justify-content-end' style={{ width: '100%' }} data-kt-user-table-toolbar='base'>
        <TicketListFilter />
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
