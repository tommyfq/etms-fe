import {useState, useEffect} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {DCUploadModal} from './DCUploadModal'
import {downloadExcelFile} from '../../core/_request.ts'
// import {CompaniesListFilter} from './CompaniesListFilter'
import { useAuth } from '../../../../../auth'
import DCListFilter from './DCListFilter.tsx'

const DCListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const {currentUser} = useAuth()
  const [readOnly, setReadOnly] = useState<boolean>(true) 

  const openAddCompanyrModal = () => {
    setItemIdForUpdate(null)
  }

  const openUploadModal = () => {
    setShowUploadModal(true)
  }

  const handleDownload = async () => {
    await downloadExcelFile();
  };

  useEffect(() => {
    if(currentUser?.role_name == "admin"){
      setReadOnly(false)
    }
  }, [])

  return (
    <>
      <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
        <DCListFilter />

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
          {
            !readOnly &&
            <>
              <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
                <KTIcon iconName='exit-up' className='fs-2' />
                Upload
              </button>
              <button type='button' className='btn btn-primary' onClick={openAddCompanyrModal}>
                <KTIcon iconName='plus' className='fs-2' />
                Add DC
              </button>
          </>
          }
        
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
