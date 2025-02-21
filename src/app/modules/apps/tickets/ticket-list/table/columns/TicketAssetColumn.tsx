import {FC} from 'react'

type Props = {
  sn?: string
  brand?: string
  model?: string
}

const TicketAssetColumn: FC<Props> = ({sn,brand,model}) => (
    <div className='fv-row'>
        <div className='card-body p-3'>
            <div className='row'>
                <label className='col-lg-12 fw-bold text-muted'>{sn}</label>
                <div className='col-lg-12'>
                    <span className='fw-bolder fs-6 text-gray-900'>{brand}</span> - <span className='fw-bolder fs-6 text-gray-900'>{model}</span>
                </div>
            </div>
        </div>
    </div>
)

export {TicketAssetColumn}
