import {FC} from 'react'

type Props = {
  data?: string
  is_active?: boolean
}

const AssetWarrantyCell: FC<Props> = ({data, is_active}) => (
    <>
        {is_active && <div className='badge badge-light-success fw-bolder'>Active</div>}<div className='badge badge-light fw-bolder'>{data}</div>
    </>
  
)

export {AssetWarrantyCell}
