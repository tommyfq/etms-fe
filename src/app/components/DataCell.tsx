import {FC} from 'react'

type Props = {
  data?: string
}

const DataCell: FC<Props> = ({data}) => (
  <div className='badge badge-light fw-bolder'>{data}</div>
)

export {DataCell}
