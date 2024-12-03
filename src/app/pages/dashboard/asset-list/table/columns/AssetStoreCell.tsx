
import {FC} from 'react'
import {AssetStore} from '../../core/_models'

type Props = {
  asset_store: AssetStore
}

const AssetStoreCell: FC<Props> = ({asset_store}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex justify-content-start flex-column'>
        <div className='text-gray-900 fw-bold text-hover-primary fs-6'>
            {asset_store.store_name}
        </div>
        <span className='text-muted fw-semibold text-muted d-block fs-7'>
            {asset_store.store_code}
        </span>
    </div>
  </div>
)

export {AssetStoreCell}
