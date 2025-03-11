import {Column} from 'react-table'
import {InfoCell} from '../../../../../../../app/components/InfoCell'
import {StatusCell} from '../../../../../../../app/components/StatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {CaseCategoryCustomerHeader} from './CaseCategoryCustomerHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {CaseCategory} from '../../core/_models'
import { CaseCategoryActionCell } from './CaseCategoryActionCell'

const itemsColumns: ReadonlyArray<Column<CaseCategory>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <CaseCategoryCustomerHeader tableProps={props} title='Case Category' className='min-w-125px' />,
    id: 'case_category',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].case_category} />,
  },
  {
    Header: (props) => (
      <CaseCategoryCustomerHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].is_active} />,
  },
  {
    Header: (props) => (
      <CaseCategoryCustomerHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CaseCategoryActionCell id={props.data[props.row.index].id} />,
  },
]

export {itemsColumns}
