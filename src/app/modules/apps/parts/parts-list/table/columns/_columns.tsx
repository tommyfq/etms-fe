import {Column} from 'react-table'
import {InfoCell} from '../../../../../../../app/components/InfoCell'
import {StatusCell} from '../../../../../../../app/components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {PartCustomHeader} from './PartCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Part} from '../../core/_models'
import { PartActionCell } from './PartActionCell'

const itemsColumns: ReadonlyArray<Column<Part>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <PartCustomHeader tableProps={props} title='Part Name' className='min-w-125px' />,
    id: 'part_name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].part_name} />,
  },
  {
    Header: (props) => (
      <PartCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].is_active} />,
  },
  {
    Header: (props) => (
      <PartCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <PartActionCell id={props.data[props.row.index].id} />,
  },
]

export {itemsColumns}
