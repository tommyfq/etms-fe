
import {FC} from 'react'

type Props = {
  data?: number
}

const AssetNumberCell: FC<Props> = ({data}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {data}
      </a>
    </div>
  </div>
)

export {AssetNumberCell}
