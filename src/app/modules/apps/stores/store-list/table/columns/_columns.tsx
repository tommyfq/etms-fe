import {Column} from 'react-table'
import {InfoCell} from '../../../../../../components/InfoCell'
import {DataCell} from '../../../../../../components/DataCell'
import {StatusCell} from '../../../../../../components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {StoreCustomHeader} from './StoreCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Store} from '../../core/_models'
import { StoreActionCell } from './StoreActionCell'

const companiesColumns: ReadonlyArray<Column<Store>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <StoreCustomHeader tableProps={props} title='Store Code' className='min-w-125px' />,
    id: 'store_code',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].store_code} />,
  },
  {
    Header: (props) => (
      <StoreCustomHeader tableProps={props} title='Store Name' className='min-w-125px' />
    ),
    id: 'store_name',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].store_name} />,
  },
  {
    Header: (props) => (
      <StoreCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].is_active} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <StoreCustomHeader tableProps={props} title='Address' className='min-w-125px' />
    ),
    id: 'address',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].address} />,
  },
  {
    Header: (props) => (
      <StoreCustomHeader tableProps={props} title='DC Name' className='min-w-125px' />
    ),
    id: 'dc_name',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].dc_name} />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <StoreCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <StoreActionCell id={props.data[props.row.index].id} />,
  },
]

export {companiesColumns}
