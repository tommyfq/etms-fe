import {Column} from 'react-table'
import {AssetInfoCell} from './AssetInfoCell'
import {AssetDataCell} from './AssetDataCell'
import {StatusCell} from '../../../../../../components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {AssetCustomHeader} from './AssetCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Asset} from '../../core/_models'
import { AssetActionCell } from './AssetActionCell'

const companiesColumns: ReadonlyArray<Column<Asset>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <AssetCustomHeader tableProps={props} title='Serial Number' className='min-w-125px' />,
    id: 'serial_number',
    Cell: ({...props}) => <AssetInfoCell data={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Status' className='min-w-125px' />
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
      <AssetCustomHeader tableProps={props} title='DC Name' className='min-w-125px' />
    ),
    id: 'dc_name',
    Cell: ({...props}) => <AssetDataCell data={props.data[props.row.index].dc_name} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Store Name' className='min-w-125px' />
    ),
    id: 'store_name',
    Cell: ({...props}) => <AssetDataCell data={props.data[props.row.index].store_name} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Warrany Status' className='min-w-125px' />
    ),
    id: 'warranty_status',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].waranty_status} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Warranty Date' className='min-w-125px' />
    ),
    id: 'warranty_date',
    Cell: ({...props}) => <AssetDataCell data={props.data[props.row.index].waranty_date} />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <AssetActionCell id={props.data[props.row.index].id} />,
  },
]

export {companiesColumns}
