import {useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {DCUploadModal} from './DCUploadModal'
import {downloadExcelFile} from '../../core/_request.ts'
// import {CompaniesListFilter} from './CompaniesListFilter'

const DCListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  const openAddCompanyrModal = () => {
    console.log("OPEN");
    setItemIdForUpdate(null)
  }

  const openUploadModal = () => {
    console.log("Open Up Modal")
    setShowUploadModal(true)
  }

  const handleDownload = async () => {
    await downloadExcelFile();
  };

  return (
    <>
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
          {/* <button type='button' className='btn btn-primary'> */}
          <button type='button' className='btn btn-light-primary me-3' onClick={handleDownload}>
            <KTIcon iconName='exit-down' className='fs-2' />
            Export
          </button>
          <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
            <KTIcon iconName='exit-up' className='fs-2' />
            Upload
          </button>
          <button type='button' className='btn btn-primary' onClick={openAddCompanyrModal}>
            <KTIcon iconName='plus' className='fs-2' />
            Add DC
          </button>
        
        {/* </Link> */}
        
        {/* end::Add user */}
      </div>
      {
        showUploadModal && (
          <DCUploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} />
        )
      }

    </>
    
  )
}

export {DCListToolbar}
