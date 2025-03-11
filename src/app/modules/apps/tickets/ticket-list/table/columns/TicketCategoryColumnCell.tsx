import {FC} from 'react'

type Props = {
  case_category?: string
  part?: string
}

const TicketCategoryColumn: FC<Props> = ({case_category,part}) => (
    <div className='fv-row'>
        <div className='card-body p-3'>
            <div className='row'>
                <label className='col-lg-12 fw-bold text-muted'>{case_category}</label>
                <div className='col-lg-12'>
                    <span className='fw-bolder fs-6 text-gray-900'>{part}</span>
                </div>
            </div>
        </div>
    </div>
)

export {TicketCategoryColumn}
