import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomerHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {itemsColumns} from './columns/_columns'
import {CaseCategory} from '../core/_models'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {CaseCategoryListPagination} from '../components/pagination/CaseCategoryListPagination'
import {KTCardBody} from '../../../../../../_metronic/helpers'

const CaseCategoryTable = () => {
  const companies = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => companies, [companies])
  const columns = useMemo(() => itemsColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_companies'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<CaseCategory>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<CaseCategory>, i) => {
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
      <CaseCategoryListPagination />
      {isLoading && <TableListLoading />}
    </KTCardBody>
  )
}

export {CaseCategoryTable}
