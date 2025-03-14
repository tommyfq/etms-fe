import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {ticketsColumns} from './columns/_columns'
import {TicketList} from '../core/_models'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {TicketListPagination} from '../components/pagination/TicketListPagination'
import {KTCardBody} from '../../../../../../_metronic/helpers'

const TicketTable = () => {
  const companies = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => companies, [companies])
  const columns = useMemo(() => ticketsColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <table
          id='kt_table_companies'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          style={{ minWidth: '1000px' }}
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<TicketList>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<TicketList>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TicketListPagination />
      {isLoading && <TableListLoading />}
    </KTCardBody>
  )
}

export {TicketTable}
