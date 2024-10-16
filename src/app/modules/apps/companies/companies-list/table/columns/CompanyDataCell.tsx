import {FC} from 'react'

type Props = {
  data?: string
}

const CompanyDataCell: FC<Props> = ({data}) => (
  <div className='badge badge-light fw-bolder'>{data}</div>
)

export {CompanyDataCell}
