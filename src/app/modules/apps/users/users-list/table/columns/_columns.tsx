import {Column} from 'react-table'
import {InfoCell} from '../../../../../../components/InfoCell'
import {DataCell} from '../../../../../../components/DataCell'
import {StatusCell} from '../../../../../../components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import { UserActionCell } from './UserActionCell'

const companiesColumns: ReadonlyArray<Column<User>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].is_active} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Username' className='min-w-125px' />
    ),
    id: 'username',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].username} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Email' className='min-w-125px' />
    ),
    id: 'email',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />
    ),
    id: 'role_name',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].role_name} />,
    },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionCell id={props.data[props.row.index].id} />,
  },
]

export {companiesColumns}
