
import {FC} from 'react'
import {Asset} from '../../core/_models'

type Props = {
  data: Asset
}

const AssetInfoCell: FC<Props> = ({data}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {data.serial_number}
      </a>
    </div>
  </div>
)

export {AssetInfoCell}
