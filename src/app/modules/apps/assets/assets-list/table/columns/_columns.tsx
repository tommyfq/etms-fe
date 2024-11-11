import {Column} from 'react-table'
import {AssetDataCell} from './AssetDataCell'
import {StatusCell} from '../../../../../../components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {AssetCustomHeader} from './AssetCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Asset} from '../../core/_models'
import { AssetActionCell } from './AssetActionCell'
import { InfoCell } from '../../../../../../components/InfoCell'

const companiesColumns: ReadonlyArray<Column<Asset>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <AssetCustomHeader tableProps={props} title='Serial Number' className='min-w-125px' />,
    id: 'serial_number',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].serial_number} />,
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
      <AssetCustomHeader tableProps={props} title='Delivery Date' className='min-w-125px' />
    ),
    id: 'delivery_date',
    Cell: ({...props}) => <AssetDataCell data={props.data[props.row.index].delivery_date} />,
  },
  {
    Header: (props) => (
      <AssetCustomHeader tableProps={props} title='Warranty Expired' className='min-w-125px' />
    ),
    id: 'warranty_expired',
    Cell: ({...props}) => <AssetDataCell data={props.data[props.row.index].warranty_expired} />,
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
