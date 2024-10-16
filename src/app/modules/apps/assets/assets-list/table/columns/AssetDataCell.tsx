import {FC} from 'react'

type Props = {
  data?: string
}

const AssetDataCell: FC<Props> = ({data}) => (
  <div className='badge badge-light fw-bolder'>{data}</div>
)

export {AssetDataCell}
