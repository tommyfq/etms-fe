import {Column} from 'react-table'
import {InfoCell} from '../../../../../../components/InfoCell'
// import {DataCell} from '../../../../../../components/DataCell'
import {PriorityColumnCell } from './PriorityColumnCell'
import { OnHoldColumnCell } from './OnHoldColumnCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {TicketCustomHeader} from './TicketCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {TicketList} from '../../core/_models'
import { TicketActionCell } from './TicketActionCell'
import { StatusColumnCell } from './StatusColumnCell'

const ticketsColumns: ReadonlyArray<Column<TicketList>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <TicketCustomHeader tableProps={props} title='Ticket No' className='min-w-125px' />,
    id: 'ticket_no',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].ticket_no} />,
  },
  {
    Header: (props) => (
      <TicketCustomHeader tableProps={props} title='Priority' className='min-w-125px' />
    ),
    id: 'priority',
    Cell: ({...props}) => <PriorityColumnCell data={props.data[props.row.index].priority} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
    {
    Header: (props) => <TicketCustomHeader tableProps={props} title='Title' className='min-w-125px' />,
    id: 'title',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].title} />,
  },
  {
    Header: (props) => (
      <TicketCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({...props}) => <StatusColumnCell data={props.data[props.row.index].status} />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <TicketCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <TicketActionCell id={props.data[props.row.index].id} />,
  },
]

export {ticketsColumns}
