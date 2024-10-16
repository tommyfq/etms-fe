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
    Header: (props) => <DCCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <DCInfoCell dc={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => <DCStatusCell is_active={props.data[props.row.index].is_active} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Contact Name' className='min-w-125px' />
    ),
    id: 'contact_name',
    Cell: ({...props}) => <DCDataCell data={props.data[props.row.index].address} />,
  },
  {
    Header: (props) => (
      <DCCustomHeader tableProps={props} title='Contact Number' className='min-w-125px' />
    ),
    id: 'contact_number',
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
