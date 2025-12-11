import {Column} from 'react-table'
import {InfoCell} from '../../../../../../../app/components/InfoCell'
import {StatusCell} from '../../../../../../../app/components/StatusCell'
import {HolidayCustomHeader} from './HolidayCustomHeader'
import {Holiday} from '../../core/_models'
import { HolidayActionCell } from './HolidayActionCell'

const holidaysColumns: ReadonlyArray<Column<Holiday>> = [
  {
    Header: (props) => <HolidayCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <HolidayCustomHeader tableProps={props} title='Date' className='min-w-125px' />,
    id: 'date',
    Cell: ({...props}) => <InfoCell data={props.data[props.row.index].date} />,
  },
  {
    Header: (props) => (
      <HolidayCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'is_active',
    Cell: ({...props}) => <StatusCell is_active={props.data[props.row.index].is_active} />,
  },
  {
    Header: (props) => (
      <HolidayCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <HolidayActionCell id={props.data[props.row.index].id} />,
  },
]

export {holidaysColumns}