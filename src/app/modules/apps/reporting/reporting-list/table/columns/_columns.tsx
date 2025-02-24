import {Column} from 'react-table'
//import {InfoCell} from '../../../../../../components/InfoCell'
import {DataCell} from '../../../../../../components/DataCell'
import { ReportStoreColumn } from './ReportStoreColumn'
import { ReportAssetColumn } from './ReportAssetColumn'
import {ReportingCustomHeader} from './ReportingCustomHeader'
// import {UserSelectionHeader} from './UserSelectionHeader'
import {Reporting} from '../../core/_models'
import { ReportStatusColumnCell } from './ReportStatusCell'
import { ReportSLAColumnCell } from './ReportSLAColumn'

/* 
  brand?: string
  model?: string
  serial_number?: string
  created_at?: string
  in_progress_at?: string
  closed_at?: string
  sla?: number
  status?: string
  description?: string
  diagnostic_name?: string
  part_name?: string
  comment_client?: string
*/
const companiesColumns: ReadonlyArray<Column<Reporting>> = [
//   {
//     Header: (props) => <UserSelectionHeader tableProps={props} />,
//     id: 'selection',
//     Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
//   },
  {
    Header: (props) => <ReportingCustomHeader tableProps={props} title='Store' className='min-w-125px' />,
    id: 's.store_name',
    Cell: ({...props}) => <ReportStoreColumn 
      dc_code={props.data[props.row.index].dc_code} 
      dc_name={props.data[props.row.index].dc_name}
      store_code={props.data[props.row.index].store_code} 
      store_name={props.data[props.row.index].store_name} 
    />,
  },
  {
    Header: (props) => <ReportingCustomHeader tableProps={props} title='Asset' className='min-w-125px' />,
    id: 'a.serial_number',
    Cell: ({...props}) => <ReportAssetColumn 
      sn={props.data[props.row.index].serial_number} 
      brand={props.data[props.row.index].brand}
      model={props.data[props.row.index].model}
    />,
  },
  {
    Header: (props) => (
      <ReportingCustomHeader tableProps={props} title='Ticket No' className='min-w-125px' />
    ),
    id: 't.ticket_no',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].ticket_no} />,
  },
  {
    Header: (props) => (
      <ReportingCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 't.status',
    Cell: ({...props}) => <ReportStatusColumnCell data={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <ReportingCustomHeader tableProps={props} title='SLA' className='min-w-125px' />
    ),
    id: 'sla',
    Cell: ({...props}) => <ReportSLAColumnCell data={props.data[props.row.index].sla} />,
  },
  {
    Header: (props) => (
      <ReportingCustomHeader tableProps={props} title='Complain At' className='min-w-125px' />
    ),
    id: 'created_at',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].created_at} />,
  },
  {
    Header: (props) => (
      <ReportingCustomHeader tableProps={props} title='Closed At' className='min-w-125px' />
    ),
    id: 't.closed_at',
    Cell: ({...props}) => <DataCell data={props.data[props.row.index].closed_at} />,
  },
]

export {companiesColumns}
