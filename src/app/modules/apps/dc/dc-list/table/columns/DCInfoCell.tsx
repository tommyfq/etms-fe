
import {FC} from 'react'
import {DC} from '../../core/_models'

type Props = {
  dc: DC
}

const DCInfoCell: FC<Props> = ({dc}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {dc.dc_name}
      </a>
    </div>
  </div>
)

export {DCInfoCell}
