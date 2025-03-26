import { useNavigate } from 'react-router-dom'
import {KTIcon} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'

const TicketModalHeader = () => {
  const navigate = useNavigate()
  const {setItemIdForUpdate, ticketNo} = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{ticketNo ? `Ticket ${ticketNo}` : 'Ticket Form'}</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => {
          setItemIdForUpdate(undefined)
          navigate('/apps/tickets/list')
        }}
        style={{cursor: 'pointer'}}
      >
        <KTIcon iconName='cross' className='fs-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {TicketModalHeader}
