import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
// import {CompaniesListFilter} from './CompaniesListFilter'

const AssetListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAssetModal = () => {
    console.log("OPEN");
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' style={{ width: '100%' }} data-kt-user-table-toolbar='base'>
      {/* <CompaniesListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-info me-2'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Upload
      </button>
      <button type='button' className='btn btn-primary' onClick={openAssetModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Asset
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {AssetListToolbar}
