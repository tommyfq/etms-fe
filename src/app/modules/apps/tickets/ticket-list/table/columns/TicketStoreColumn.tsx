import {FC} from 'react'

type Props = {
  dc_code?: string
  dc_name?: string
  store_code?: string
  store_name?: string
}

const TicketStoreColumn: FC<Props> = ({dc_code, dc_name, store_code, store_name}) => (
    <div className='fv-row'>
        <div className='card-body p-3'>
            <div className='row mb-3'>
                <div className="col-12">
                    <label className='fw-bold text-muted'>{dc_code}</label> - <span className='fw-bolder fs-6 text-gray-900'>{dc_name}</span>
                </div>
                <div className="col-12">
                    <label className='fw-bold text-muted'>{store_code}</label> - <span className='fw-bolder fs-6 text-gray-900'>{store_name}</span>
                </div>
            </div>
        </div>
    </div>
)

export {TicketStoreColumn}
