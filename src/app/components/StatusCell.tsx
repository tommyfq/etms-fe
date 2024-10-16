import {FC} from 'react'

type Props = {
  is_active?: boolean
}

const StatusCell: FC<Props> = ({is_active}) => (
  <> {is_active && <div className='badge badge-light-success fw-bolder'>Active</div>}</>
)

export {StatusCell}
