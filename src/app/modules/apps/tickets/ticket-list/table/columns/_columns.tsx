import {Column} from 'react-table'
import {InfoCell} from '../../../../../../components/InfoCell'
// import {DataCell} from '../../../../../../components/DataCell'
import {PriorityColumnCell } from './PriorityColumnCell'
// import { OnHoldColumnCell } from './OnHoldColumnCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {TicketCustomHeader} from './TicketCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {TicketList} from '../../core/_models'
import { TicketActionCell } from './TicketActionCell'
import { StatusColumnCell } from './StatusColumnCell'
import { TicketAssetColumn } from './TicketAssetColumn'
import { TicketStoreColumn } from './TicketStoreColumn'
import { TicketCategoryColumn } from './TicketCategoryColumnCell'

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
  {
    Header: (props) => (
      <TicketCustomHeader tableProps={props} title='Created At' className='min-w-100px' />
    ),
    id: 'created_at',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].createdAt} />,
  },
  {
    Header: (props) => <TicketCustomHeader tableProps={props} title='Category' className='min-w-125px' />,
    id: 'category',
    Cell: ({...props}) => <TicketCategoryColumn 
      case_category={props.data[props.row.index].case_category} 
      part={props.data[props.row.index].part_name}
    />,
  },
  {
    Header: (props) => <TicketCustomHeader tableProps={props} title='Asset' className='min-w-125px' />,
    id: 'asset',
    Cell: ({...props}) => <TicketAssetColumn 
      sn={props.data[props.row.index].serial_number} 
      brand={props.data[props.row.index].brand}
      model={props.data[props.row.index].model}
    />,
  },
  {
    Header: (props) => <TicketCustomHeader tableProps={props} title='Store' className='min-w-125px' />,
    id: 'store',
    Cell: ({...props}) => <TicketStoreColumn 
      dc_code={props.data[props.row.index].dc_code} 
      dc_name={props.data[props.row.index].dc_name}
      store_code={props.data[props.row.index].store_code} 
      store_name={props.data[props.row.index].store_name} 
    />,
  },
  {
    Header: (props) => (
      <TicketCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <TicketActionCell id={props.data[props.row.index].id} />,
  },
]

export {ticketsColumns}
