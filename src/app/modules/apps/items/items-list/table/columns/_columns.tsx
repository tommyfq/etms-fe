import {Column} from 'react-table'
import {InfoCell} from '../../../../../../../app/components/InfoCell'
import {StatusCell} from '../../../../../../../app/components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {ItemCustomHeader} from './ItemCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Item} from '../../core/_models'
import { ItemActionCell } from './ItemActionCell'

const itemsColumns: ReadonlyArray<Column<Item>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <ItemCustomHeader tableProps={props} title='Brand' className='min-w-125px' />,
    id: 'brand',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].brand} />,
  },
  {
    Header: (props) => <ItemCustomHeader tableProps={props} title='Model' className='min-w-125px' />,
    id: 'model',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].model} />,
  },
  {
    Header: (props) => <ItemCustomHeader tableProps={props} title='Warranty Duration' className='min-w-125px' />,
    id: 'warranty_duration',
    Cell: ({...props}) => <InfoCell data={String(props.data[props.row.index].warranty_duration)} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <ItemCustomHeader tableProps={props} title='Active' className='min-w-125px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].is_active} />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <ItemCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ItemActionCell id={props.data[props.row.index].id} />,
  },
]

export {itemsColumns}
