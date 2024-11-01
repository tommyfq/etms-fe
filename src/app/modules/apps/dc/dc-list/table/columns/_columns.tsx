import {Column} from 'react-table'
import {DCInfoCell} from './DCInfoCell'
import {DCDataCell} from './DCDataCell'
import {DCStatusCell} from './DCStatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {DCCustomHeader} from './DCCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {DC} from '../../core/_models'
import { DCActionCell } from './DCActionCell'

const companiesColumns: ReadonlyArray<Column<DC>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <DCCustomHeader tableProps={props} title='DC Name' className='min-w-125px' />,
    id: 'dc_name',
    Cell: ({...props}) => <DCInfoCell dc={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <DCStatusCell is_active={props.data[props.row.index].is_active} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Address' className='min-w-125px' />
    ),
    id: 'address',
    Cell: ({...props}) => <DCDataCell data={props.data[props.row.index].address} />,
  },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Company Name' className='min-w-125px' />
    ),
    id: 'company_name',
    Cell: ({...props}) => <DCDataCell data={props.data[props.row.index].company_name} />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <DCActionCell id={props.data[props.row.index].id} />,
  },
]

export {companiesColumns}
