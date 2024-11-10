

import {useState, useEffect} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {StoreUploadModal} from './StoreUploadModal'
// import {StoreListFilter} from './StoreListFilter'
// import {TooltipMenu} from './TooltipMenu'
import {downloadExcelFile} from '../../core/_requests.ts'
import { useAuth } from '../../../../../auth'


const StoreListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const {currentUser} = useAuth()
  const [readOnly, setReadOnly] = useState<boolean>(true) 

  const openAddCompanyModal = () => {
    console.log("OPEN");
    setItemIdForUpdate(null)
  }

  const openUploadModal = () => {
    setShowUploadModal(true)
  }

  const handleDownload = async () => {
    await downloadExcelFile();
  };

  // const handleOptionClick = (option: string) => {
  //     console.log(`${option} clicked`);
  // };

  useEffect(() => {
    if(currentUser?.role_name == "admin"){
      setReadOnly(false)
    }
  }, [])

  return (
    <>
      <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
        {/* <StoreListFilter /> */}
        {/* begin::Export */}
        <button type='button' className='btn btn-light-primary me-3' onClick={handleDownload}>
          <KTIcon iconName='exit-down' className='fs-2' />
          Export
        </button>
        {/* end::Export */}

        {
          !readOnly &&
          <>
            <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
              <KTIcon iconName='exit-up' className='fs-2'/>
              Upload
            </button>
            <button type='button' className='btn btn-primary' onClick={openAddCompanyModal}>
              <KTIcon iconName='plus' className='fs-2' />
              Add Store
            </button>
          </>
        }
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
