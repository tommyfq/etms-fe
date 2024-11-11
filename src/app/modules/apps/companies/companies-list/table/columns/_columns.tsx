import {Column} from 'react-table'
// import {UserActionsCell} from './UserActionsCell'
// import {UserSelectionCell} from './UserSelectionCell'
import {CompanyCustomerHeader} from './CompanyCustomerHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Company} from '../../core/_models'
import { CompanyActionCell } from './CompanyActionCell'
import { InfoCell } from '../../../../../../components/InfoCell'
import { StatusCell } from '../../../../../../components/StatusCell'
import { DataCell } from '../../../../../../components/DataCell'

const companiesColumns: ReadonlyArray<Column<Company>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <CompanyCustomerHeader tableProps={props} title='Company Code' className='min-w-125px' />,
    id: 'company_code',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].company_code} />,
  },
  {
    Header: (props) => <CompanyCustomerHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].company_name} />,
  },
  {
    Header: (props) => (
      <CompanyCustomerHeader tableProps={props} title='Status' className='min-w-125px' />
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
      <CompanyCustomerHeader tableProps={props} title='Contact Name' className='min-w-125px' />
    ),
    id: 'contact_name',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].contact_name} />,
  },
  {
    Header: (props) => (
      <CompanyCustomerHeader tableProps={props} title='Contact Number' className='min-w-125px' />
    ),
    id: 'contact_number',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].contact_number} />,
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
