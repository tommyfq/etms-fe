
import {FC} from 'react'

type Props = {
  data?: string
}

const InfoCell: FC<Props> = ({data}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800 mb-1 text-truncate' style={{ maxWidth: '200px' }}>
        {data}
      </span>
    </div>
  </div>
)

export {InfoCell}
