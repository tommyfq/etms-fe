import {useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import { downloadExcelFile } from '../../core/_requests'
import { CaseCategoryUploadModal } from './CaseCategoryUploadModal'
// import {CompaniesListFilter} from './CompaniesListFilter'

const CaseCategoryListToolbar = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const {setItemIdForUpdate} = useListView()

  const openAddItemModal = () => {
    setItemIdForUpdate(null)
  }

  const openUploadModal = () => {
    setShowUploadModal(true)
  }

  const handleDownload = async () => {
    await downloadExcelFile();
  };

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <CompaniesListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button> */}
      {/* end::Export */}
      <button type='button' className='btn btn-light-primary me-3' onClick={handleDownload}>
        <KTIcon iconName='exit-down' className='fs-2' />
        Export
      </button>
      <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
        <KTIcon iconName='exit-up' className='fs-2' />
        Upload
      </button>
      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={openAddItemModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Case Category
      </button>
      {/* end::Add user */}
      {
      showUploadModal && (
        <CaseCategoryUploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} />
        )
      }
    </div>

    
  )
}

export {CaseCategoryListToolbar}
