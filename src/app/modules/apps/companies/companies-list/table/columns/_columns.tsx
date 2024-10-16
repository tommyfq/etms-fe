import {Column} from 'react-table'
import {CompanyInfoCell} from './CompanyInfoCell'
import {CompanyDataCell} from './CompanyDataCell'
import {CompanyStatusCell} from './CompanyStatusCell'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {CompanyCustomerHeader} from './CompanyCustomerHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Company} from '../../core/_models'
import { CompanyActionCell } from './CompanyActionCell'

const companiesColumns: ReadonlyArray<Column<Company>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <CompanyCustomerHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <CompanyInfoCell company={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CompanyCustomerHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'active',
    Cell: ({...props}) => <CompanyStatusCell is_active={props.data[props.row.index].is_active} />,
  },
//   {
//     Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
//     accessor: 'role',
//   },
  {
    Header: (props) => (
      <CompanyCustomerHeader tableProps={props} title='Contact Name' className='min-w-125px' />
    ),
    id: 'contact_name',
    Cell: ({...props}) => <CompanyDataCell data={props.data[props.row.index].contact_name} />,
  },
  {
    Header: (props) => (
      <CompanyCustomerHeader tableProps={props} title='Contact Number' className='min-w-125px' />
    ),
    id: 'contact_number',
    Cell: ({...props}) => <CompanyDataCell data={props.data[props.row.index].contact_number} />,
  },
//   {
//     Header: (props) => (
//       <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
//     ),
//     accessor: 'joined_day',
//   },
  {
    Header: (props) => (
      <CompanyCustomerHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <CompanyActionCell id={props.data[props.row.index].id} />,
  },
]

export {companiesColumns}
