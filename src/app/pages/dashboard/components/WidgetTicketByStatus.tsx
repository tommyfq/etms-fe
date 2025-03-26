
import { FC, useEffect, useState } from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import { getTicketCountByStatus } from '../core/_requests'
import { TicketCounts } from '../core/_models'
import { toCamelCase } from '../../../helpers/helper'

type Props = {
  className: string
  color: string
}

const WidgetTicketByStatus: FC<Props> = ({className, color}) => {
  const [ticketCounts, setTicketCounts] = useState<TicketCounts[]>([]);
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await getTicketCountByStatus()
        const data = response.data?.ticketCounts ?? []
        const total = response.data?.total ?? 0
        setTicketCounts(data)
        setTotal(total)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bold fs-3'>Ticket Summary</h3>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-semibold fs-7'>Total Ticket</span>
            <span className='fw-bold fs-2x pt-1'>{total !== undefined && total > 1 ? `${total} Tickets` : `${total} Ticket`}</span>
            
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
          style={{marginTop: '-100px'}}
        >
          { ticketCounts.map((ticket, index) => (
            <div className='d-flex align-items-center mb-6' key={index}>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTIcon iconName={
                  ticket.status == "open" ? `dots-circle`: 
                  ticket.status == "in progress" ? `arrows-loop` :
                  ticket.status == "on hold" ? `loading` : 
                  ticket.status == "cancel" ? `tablet-delete` :
                  ticket.status == "closed" ? `tablet-ok` :
                  `cross-circle`} className='fs-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <div className='fs-5 text-gray-800 fw-bold'>
                  {/* <Link to={`/apps/ticket/list?status=`+ticket.status} > */}
                    {toCamelCase(ticket.status)}
                  {/* </Link> */}
                </div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>{ticket.count}</div>
                {/* <KTIcon iconName='arrow-up' className='fs-5 text-success ms-1' /> */}
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          ))}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {WidgetTicketByStatus}
