import {useState} from 'react'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import { downloadExcelFile } from '../../core/_requests'
import { HolidayUploadModal } from './HolidayUploadModal'

const HolidayListToolbar = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const {setItemIdForUpdate} = useListView()

  const openAddHolidayModal = () => {
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
      <button type='button' className='btn btn-light-primary me-3' onClick={handleDownload}>
        <KTIcon iconName='exit-down' className='fs-2' />
        Export
      </button>
      <button type='button' className='btn btn-info me-2' onClick={openUploadModal}>
        <KTIcon iconName='exit-up' className='fs-2' />
        Upload
      </button>
      {/* begin::Add holiday */}
      <button type='button' className='btn btn-primary' onClick={openAddHolidayModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Holiday
      </button>
      {/* end::Add holiday */}
      {
      showUploadModal && (
        <HolidayUploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} />
        )
      }
    </div>
  )
}

export {HolidayListToolbar}